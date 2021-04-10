import GoldToken from 0xf8d6e0586b0a20c7

transaction(recipent: Address) {

  // Local variable for storing the reference to the minter resource
  let mintingRef: &GoldToken.VaultMinter

  // Local variable for storing the reference to the Vault of
  // the account that will receive the newly minted tokens
  var receiver: Capability<&GoldToken.Vault{GoldToken.Receiver}>

  prepare(account: AuthAccount) {

    // Borrow a reference to the stored, private minter resource
    self.mintingRef = account.borrow<&GoldToken.VaultMinter>(from: /storage/MainMinter) ?? panic("Could not borrow a reference to the minter")

    // Get the public account object for account
    let recipient = getAccount(recipent)

    // Get their public receiver capability
    self.receiver = recipient.getCapability<&GoldToken.Vault{GoldToken.Receiver}>(/public/MainReceiver)
  }

  execute {
    // Mint 30 tokens and deposit them into the recipient's Vault
    self.mintingRef.mintTokens(amount: 30.0, recipient: self.receiver)

    log("30 gold tokens minted and deposited to ".concat(recipent.toString()))
  }
}
