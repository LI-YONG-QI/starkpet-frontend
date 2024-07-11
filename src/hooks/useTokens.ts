import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { Contract, RpcProvider, num } from "starknet";

import { TOKEN_ABI } from "@/abis/pet";
import { RPC, TOKEN } from "@/constants";

const getTokens = async (owner: string) => {
  const provider = new RpcProvider({ nodeUrl: `${RPC}` });

  // read abi of Test contract
  const pet = new Contract(TOKEN_ABI, TOKEN, provider);
  const currentId = await pet.get_current_id();

  const tokens = [];

  for (var i = 1; i <= currentId; i++) {
    const res = await pet.owner_of(i);
    if (res == owner) tokens.push(i);
  }

  return tokens;
};

export const useTokens = (tba?: string) => {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<number[]>([]);

  const getAllTokens = async (addr: string) => {
    setTokens(await getTokens(addr));
  };

  useEffect(() => {
    if (tba) {
      getAllTokens(tba);
    } else if (address) {
      getAllTokens(address);
    }
  }, [address, tba]);

  return { tokens };
};
