"use client";

import { TOKEN } from "@/constants";
import { useTokenbound } from "@/hooks/useTokenbound";
import { useTokens } from "@/hooks/useTokens";
import { ErrorHandlerSource } from "next/dist/server/app-render/create-error-handler";
import { Call } from "starknet-tokenbound-sdk";
import { CallData, hash } from "starknet";

// [
//   {
//     "calldata": [
//       "1114327824793811820021857486895383008041757152587980254598819061630962908707"
//     ],
//     "contractAddress": "0xb165f860db5d917547550bd16939193f79cb0c681e34fd48f3e7dbeb077d19",
//     "entrypoint": "mint"
//   }
// ]

// [
//   {
//     "calldata": [
//       "1",
//       "313435703113795059625801237376987795864982031259792386094545647523974315289",
//       "1835626100",
//       "1",
//       "3356250781776520436441768701224524644553686905441874184280043715455212670585"
//     ],
//     "contractAddress": "0x0276afec375096731bbd681ce82d3e9258c812b429c713a049efc0beed0a3e23",
//     "entrypoint": "__execute__"
//   }
// ]

export default function Page({ params }: { params: { address: string } }) {
  const { address } = params;
  const { tokens } = useTokens(address);
  const { tokenboundClient } = useTokenbound();

  const mintByTBA = async () => {
    const call: Call = {
      to: TOKEN, //contractAddress to call
      selector: hash.getSelectorFromName("mint"), // method to be called on the contract
      calldata: CallData.compile({
        to: address,
      }),
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
