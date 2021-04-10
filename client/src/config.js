import { config } from "@onflow/fcl";

const ACCESS_NODE = process.env.REACT_APP_ACCESS_NODE;
const WALLET_DISCOVERY = process.env.REACT_APP_WALLET_DISCOVERY;
const CONTRACT_PROFILE = process.env.REACT_APP_CONTRACT_PROFILE;
const CONTRACT_GOLD = process.env.REACT_APP_CONTRACT_GOLD;
// const CONTRACT_MATERIALS = process.env.REACT_APP_CONTRACT_MATERIALS;

config()
  .put("accessNode.api", ACCESS_NODE)
  .put("challenge.handshake", WALLET_DISCOVERY)
  .put("0xProfile", `0x${CONTRACT_PROFILE}`)
  .put("0xGoldToken", `0x${CONTRACT_GOLD}`);
