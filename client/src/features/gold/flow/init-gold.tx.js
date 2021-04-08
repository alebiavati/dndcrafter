import * as fcl from "@onflow/fcl";

export async function initGoldTx() {
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

          prepare(acct: AuthAccount) {
            // save the address for the post check
            self.address = acct.address

            // Create a link to the Vault in storage that is restricted to the
            // fields and functions in 'Receiver' and 'Balance' interfaces,
            // this only exposes the balance field
            // and deposit function of the underlying vault.
            //
            acct.link<&GoldToken.Vault{GoldToken.Receiver, GoldToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

            log("Public Receiver reference created!")
          }

          post {
            // Check that the capabilities were created correctly
            // by getting the public capability and checking
            // that it points to a valid 'Vault' object
            // that implements the 'Receiver' interface
            // getAccount(self.address).getCapability<&GoldToken.Vault{GoldToken.Receiver}>(/public/MainReceiver)
            //   .check():
            //   "Vault Receiver Reference was not created correctly"
            // }
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
