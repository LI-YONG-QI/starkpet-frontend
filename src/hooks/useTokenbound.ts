import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { RPC } from "starknet";
import {
  TokenboundClient,
  TokenboundClientOptions,
} from "starknet-tokenbound-sdk";

import { ACCOUNT_HASH, REGISTRY, TOKEN } from "@/constants";

export const useTokenbound = () => {
  const { account } = useAccount();
  const [isError, setIsError] = useState(true);

  const options: TokenboundClientOptions = {
    account: account,
    registryAddress: REGISTRY,
    implementationAddress: ACCOUNT_HASH,
    jsonRPC: RPC,
  };

  const tokenboundClient = account && new TokenboundClient(options);

  const _validate = () => {
    if (isError) throw new Error("Not connect account yet");
  };

  const createAccount = async (tokenId: string, salt: string = "0") => {
    _validate();

    await tokenboundClient?.createAccount({
      tokenContract: TOKEN,
      tokenId,
      salt,
    });
  };

  const checkAccount = async (tokenId: string, salt: string = "0") => {
    _validate();

    console.log(tokenboundClient);

    const status = await tokenboundClient?.checkAccountDeployment({
      tokenContract: TOKEN,
      tokenId,
      salt, //optional
    });

    return status;
  };

  const transferNFT = async (
    tba: string,
    tokenId: string,
    recipient: string
  ) => {
    _validate();

    await tokenboundClient?.transferNFT({
      tbaAddress: tba,
      contractAddress: TOKEN,
      tokenId,
      sender: tba,
      recipient,
    });
  };

  useEffect(() => {
    if (!account) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [account]);

  return {
    createAccount,
    checkAccount,
    transferNFT,
    isError,
    tokenboundClient,
  };
};
