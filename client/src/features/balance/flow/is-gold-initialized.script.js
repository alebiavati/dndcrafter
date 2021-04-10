import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

export async function isGoldInitializedScript(address) {
  if (address == null)
    throw new Error("isInitialized(address) -- address required");

  return fcl
    .send([
      fcl.script`
        import GoldToken from 0xGoldToken

        pub fun main(address: Address): Bool {
          return getAccount(address).getCapability<&GoldToken.Vault{GoldToken.Receiver}>(/public/MainReceiver).check()
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode);
}
