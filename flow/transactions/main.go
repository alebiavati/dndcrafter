package main

import (
  "os"
	"fmt"
	"time"
  "context"
  "io/ioutil"
	"encoding/json"
	"google.golang.org/grpc"
	"github.com/onflow/cadence"
  "github.com/onflow/flow-go-sdk"
  "github.com/onflow/flow-go-sdk/client"
	"github.com/onflow/flow-go-sdk/crypto"
)

const configPath = "../flow.json"

var (
	conf config
)

type config struct {
	Accounts struct {
		Service struct {
			Address    string `json:"address"`
			PrivateKey string `json:"privateKey"`
			SigAlgo    string `json:"sigAlgorithm"`
			HashAlgo   string `json:"hashAlgorithm"`
		}
	}
	Contracts map[string]string `json:"contracts"`
}

// ReadFile reads a file from the file system.
func ReadFile(path string) string {
	contents, err := ioutil.ReadFile(path)
	Handle(err)

	return string(contents)
}

func readConfig() config {
	f, err := os.Open(configPath)
	if err != nil {
		if os.IsNotExist(err) {
			fmt.Println("Emulator examples must be run from the flow-go-sdk/examples directory. Please see flow-go-sdk/examples/README.md for more details.")
		} else {
			fmt.Printf("Failed to load config from %s: %s\n", configPath, err.Error())
		}

		os.Exit(1)
	}

	var conf config
	err = json.NewDecoder(f).Decode(&conf)
	Handle(err)

	return conf
}

func init() {
	conf = readConfig()
}

func Handle(err error) {
	if err != nil {
		fmt.Println("err:", err.Error())
		panic(err)
	}
}

func ServiceAccount(flowClient *client.Client) (flow.Address, *flow.AccountKey, crypto.Signer) {
	sigAlgo := crypto.StringToSignatureAlgorithm("ECDSA_P256")
	privateKey, err := crypto.DecodePrivateKeyHex(sigAlgo, "f2039ac0e7bc911f937b1c2ad1f252a32456009be4cb812e93e90c873b17cf49")
	Handle(err)

	addr := flow.HexToAddress("f8d6e0586b0a20c7")
	acc, err := flowClient.GetAccount(context.Background(), addr)
	Handle(err)

	accountKey := acc.Keys[0]
	signer := crypto.NewInMemorySigner(privateKey, accountKey.HashAlgo)
	return addr, accountKey, signer
}

func WaitForSeal(ctx context.Context, c *client.Client, id flow.Identifier) *flow.TransactionResult {
	result, err := c.GetTransactionResult(ctx, id)
	Handle(err)

	fmt.Printf("Waiting for transaction %s to be sealed...\n", id)

	for result.Status != flow.TransactionStatusSealed {
		time.Sleep(time.Second)
		fmt.Print(".")
		result, err = c.GetTransactionResult(ctx, id)
		Handle(err)
	}

	fmt.Println()
	fmt.Printf("Transaction %s sealed\n", id)
	return result
}

func main() {
	ctx := context.Background()
  greeting, err := ioutil.ReadFile("SendGold.cdc")
  if err != nil {
    panic("failed to load Cadence script")
  }

  // Establish a connection with an access node
  flowClient, err := client.New("127.0.0.1:3569", grpc.WithInsecure())
  if err != nil {
    panic("failed to establish connection with Access API")
  }

	serviceAcctAddr, serviceAcctKey, serviceSigner := ServiceAccount(flowClient)

  // Get the latest sealed block to use as a reference block
  latestBlock, err := flowClient.GetLatestBlockHeader(context.Background(), true)
  if err != nil {
    panic("failed to fetch latest block")
  }

  tx := flow.NewTransaction().
    SetScript(greeting).
    SetGasLimit(100).
    SetReferenceBlockID(latestBlock.ID).
		SetProposalKey(serviceAcctAddr, serviceAcctKey.Index, serviceAcctKey.SequenceNumber).
		SetPayer(serviceAcctAddr).
    AddAuthorizer(serviceAcctAddr)

  // Add arguments last

  recipientAddress := flow.HexToAddress("f669cb8d41ce0c74")
  recipient := cadence.NewAddress(recipientAddress)

  err = tx.AddArgument(recipient)
  if err != nil {
    panic("invalid argument")
  }

	fmt.Println("Sending transaction:")
	fmt.Println()
	fmt.Println("----------------")
	fmt.Println("Script:")
	fmt.Println(string(tx.Script))
	fmt.Println("Arguments:")
	fmt.Printf("recipient: %s\n", recipient)
	fmt.Println("----------------")
	fmt.Println()

	err = tx.SignEnvelope(serviceAcctAddr, serviceAcctKey.Index, serviceSigner)
	Handle(err)

	err = flowClient.SendTransaction(ctx, *tx)
	Handle(err)

	_ = WaitForSeal(ctx, flowClient, tx.ID())
}
