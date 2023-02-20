import { BigNumber, Contract, ethers, providers, Signer } from "ethers";
import { getConfig } from "../config";

const config = getConfig();

export const callChangeMethod = (
  method: string,
  args: any,
  signer: Signer,
  value: BigNumber = BigNumber.from("0"),
  contractAddress: string
) => {
  const writeContract = new Contract(contractAddress, config.abi, signer);
  let resp = writeContract[method](...args, {
    value,
  });
  return resp;
};

export const callViewMethod = (
  method: string,
  args: any[],
  provider: providers.Provider,
  contractAddress: string
) => {
  let readContract = new ethers.Contract(contractAddress, config.abi, provider);
  let resp = readContract[method](...args);
  return resp;
};
