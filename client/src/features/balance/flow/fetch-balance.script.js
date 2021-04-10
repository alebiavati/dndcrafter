import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

export async function fetchBalanceScript(address) {
  if (address == null) return null;

  return fcl
    .send([
      fcl.script`
        import GoldToken from 0xGoldToken

        pub fun main(address: Address): UFix64? {
          let acct = getAccount(address)
          let acctReceiverRef = acct.getCapability<&GoldToken.Vault{GoldToken.Balance}>(/public/MainReceiver)
              .borrow()
              ?? panic("Could not borrow a reference to the acct receiver")

          return acctReceiverRef.balance
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode);
}
