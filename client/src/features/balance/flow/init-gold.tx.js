import * as fcl from "@onflow/fcl";

export async function initGoldTx() {
  console.log(fcl.authz);
  const txId = await fcl
    .send([
      // Transactions use fcl.transaction instead of fcl.script
      // Their syntax is a little different too
      fcl.transaction`
        import GoldToken from 0xGoldToken

        // This transaction creates a capability
        // that is linked to the account's token vault.
        // The capability is restricted to the fields in the 'Receiver' interface,
        // so it can only be used to deposit funds into the account.
        transaction {
          let address: Address

          prepare(account: AuthAccount) {
            self.address = account.address

            // Create a new empty Vault object
            let vaultA <- GoldToken.createEmptyVault()

            // Store the vault in the account storage
            account.save<@GoldToken.Vault>(<-vaultA, to: /storage/MainVault)

            log("Empty Vault stored")

            // Create a public Receiver capability to the Vault
            let ReceiverRef = account.link<&GoldToken.Vault{GoldToken.Receiver, GoldToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

            log("References created")
          }

          post {
            // Check that the capabilities were created correctly
            getAccount(self.address).getCapability<&GoldToken.Vault{GoldToken.Receiver}>(/public/MainReceiver)
              .check():
              "Vault Receiver Reference was not created correctly"
            }
        }

      `,
      fcl.payer(fcl.authz), // current user is responsible for paying for the transaction
      fcl.proposer(fcl.authz), // current user acting as the nonce
      fcl.authorizations([fcl.authz]), // current user will be first AuthAccount
      fcl.limit(35), // set the compute limit
    ])
    .then(fcl.decode);

  return fcl.tx(txId).onceSealed();
}
