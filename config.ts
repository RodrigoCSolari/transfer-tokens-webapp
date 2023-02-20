import { localhost, aurora } from "@wagmi/chains";
import { erc20ABI, goerli, mainnet } from "wagmi";

export const getConfig = () => {
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV || "aurora";
  switch (env) {
    case "production":
    case "aurora":
      return {
        networkId: "aurora",
        wagmiNetwork: aurora,
        nodeUrl: "https://mainnet.aurora.dev",
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_AURORA,
        explorerUrl: "https://explorer.aurora.dev",
        abi: erc20ABI,
      };
    case "mainnet":
      return {
        networkId: "mainnet",
        wagmiNetwork: mainnet,
        rcpUrl: "https://mainnet.infura.io/v3/",
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET,
        explorerUrl: "https://etherscan.io",
        abi: erc20ABI,
      };
    case "goerli":
      return {
        networkId: "goerli",
        wagmiNetwork: goerli,
        nodeUrl: "https://goerli.infura.io/v3/",
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_GOERLI,
        explorerUrl: "https://goerli.etherscan.io",
        abi: erc20ABI,
      };
    case "development":
    case "preview":
    case "localhost":
      return {
        networkId: "localhost",
        wagmiNetwork: localhost,
        nodeUrl: "http://localhost:8545",
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_LOCALHOST,
        explorerUrl: "",
        abi: erc20ABI,
      };
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
};
