"use client";

import { TOKEN } from "@/constants";
import { useTokenbound } from "@/hooks/useTokenbound";
import { useTokens } from "@/hooks/useTokens";
import { ErrorHandlerSource } from "next/dist/server/app-render/create-error-handler";
import { Call } from "starknet-tokenbound-sdk";

export default function Page({ params }: { params: { address: string } }) {
  const { address } = params;
  const { tokens } = useTokens(address);
  const { tokenboundClient } = useTokenbound();

  const mintByTBA = async () => {
    const call: Call = {
      to: TOKEN, //contractAddress to call
      selector: "mint", // method to be called on the contract
      calldata: [address],
    };

    try {
      await tokenboundClient?.execute(address, [call]);
    } catch (error) {
      console.error(ErrorHandlerSource);
    }
  };

  return (
    <div>
      <div>My Post: {address}</div>

      {tokens.map((token, index) => (
        <div key={index}>{token}</div>
      ))}

      <button onClick={mintByTBA}> Mint</button>
    </div>
  );
}
