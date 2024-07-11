"use client";

import {
  useAccount,
  useContract,
  useContractWrite,
} from "@starknet-react/core";
import { TOKEN_ABI } from "@/abis/pet";
import { useMemo } from "react";
import { TBA, TOKEN } from "@/constants";

export const MintBtn = () => {
  const { address } = useAccount();

  const { contract } = useContract({
    abi: TOKEN_ABI,
    address: TOKEN,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    return contract.populateTransaction["mint"](TBA);
  }, [contract, address]);

  const { writeAsync, data, isPending } = useContractWrite({
    calls,
  });

  return (
    <div>
      <button onClick={() => writeAsync()}>Mint</button>

      <p>status: {isPending && <div>Submitting...</div>}</p>
      <p>hash: {data?.transaction_hash}</p>
    </div>
  );
};
