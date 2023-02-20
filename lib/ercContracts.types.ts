import { BigNumber } from "ethers";

export type ContractData = {
  decimals: number;
  tokenName: string;
  userBalance: BigNumber;
  symbol: string;
};
