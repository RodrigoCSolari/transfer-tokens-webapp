import { ethers } from "ethers";
import { useQuery } from "react-query";
import { useAccount, useProvider } from "wagmi";
import { REFETCH_INTERVAL } from "../constants";
import { getContractData } from "../lib/ercContracts";
import { ContractData } from "../lib/ercContracts.types";

export const useGetContractData = (contractAddress: string) => {
  const provider = useProvider();
  const { address: userAddress } = useAccount();
  return useQuery<ContractData>(
    "contractData",
    () => getContractData(provider, contractAddress, userAddress),
    {
      onError: (err) => {
        console.error(err);
      },
      refetchInterval: REFETCH_INTERVAL,
      staleTime: REFETCH_INTERVAL,
    }
  );
};
