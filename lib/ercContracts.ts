import { ethers } from "ethers";
import { contractMethods } from "./methods";
import { callChangeMethod, callViewMethod } from "./ethereum";
import { etow } from "./util";

export const transfer = (
  signer: ethers.Signer,
  transferValue: string,
  tokenAddress: string,
  receiverAddress: string
) => {
  return callChangeMethod(
    contractMethods.transfer,
    [receiverAddress, transferValue],
    signer,
    etow("0"),
    tokenAddress
  );
};

export const getContractData = async (
  provider: ethers.providers.Provider,
  contractAddress: string,
  userAddress: string = "0x0000000000000000000000000000000000000000"
) => {
  let [userBalance, tokenName, decimals, symbol] = await Promise.all([
    callViewMethod(
      contractMethods.balanceOf,
      [userAddress],
      provider,
      contractAddress
    ),
    callViewMethod(contractMethods.name, [], provider, contractAddress),
    callViewMethod(contractMethods.decimals, [], provider, contractAddress),
    callViewMethod(contractMethods.symbol, [], provider, contractAddress),
  ]);
  userBalance = userBalance.toString();
  return {
    decimals,
    tokenName,
    userBalance,
    symbol,
  };
};
