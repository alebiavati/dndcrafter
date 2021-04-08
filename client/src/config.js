import { config } from "@onflow/fcl";

// const ACCESS_NODE = process.env.ACCESS_NODE;
// const WALLET_DISCOVERY = process.env.WALLET_DISCOVERY;
// const CONTRACT_PROFILE = process.env.CONTRACT_PROFILE;

const ACCESS_NODE = "http://localhost:8080";
const WALLET_DISCOVERY = "http://localhost:8700/flow/authenticate";
const CONTRACT_PROFILE = "0xf8d6e0586b0a20c7";

config()
  .put("accessNode.api", ACCESS_NODE)
  .put("challenge.handshake", WALLET_DISCOVERY)
  .put("0xProfile", CONTRACT_PROFILE);

// .put("0xGoldToken", "0x144d7ac0a2a05b23");
