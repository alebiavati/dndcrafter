import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

export async function fetchGoldScript(address) {
  if (address == null) return null;

  return fcl
    .send([
      fcl.script`
        import GoldToken from 0xGoldToken

        pub fun main(address: Address) {
          let acct = getAccount(address)
          let acctReceiverRef = acct1.getCapability<&ExampleToken.Vault{ExampleToken.Balance}>(/public/MainReceiver)
              .borrow()
              ?? panic("Could not borrow a reference to the acct1 receiver")

          return acct1ReceiverRef.balance
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode);
}
