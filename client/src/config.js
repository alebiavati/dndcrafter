import { config } from "@onflow/fcl";

config()
  .put("accessNode.api", "https://access-testnet.onflow.org") // Configure FCL's Access Node
  .put("challenge.handshake", "https://fcl-discovery.onflow.org/testnet/authn") // Configure FCL's Wallet Discovery mechanism
  .put("0xProfile", "0xba1132bc08f82fe2") // Will let us use `0xProfile` in our Cadence
  .put("0xGoldToken", "0x144d7ac0a2a05b23");
