"use client";
import { useAccount, useConnect } from "@starknet-react/core";
import { useStarknetkitConnectModal } from "starknetkit";

export default function Navbar() {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();

  // const { starknetkitConnectModal } = useStarknetkitConnectModal({
  //   connectors: connectors as any,
  // });

  // const connectWallet = async () => {
  //   try {
  //     const { connector } = await starknetkitConnectModal();
  //     await connect({ connector });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="h-[100px]">
      <ul>
        {connectors.map((connector) => (
          <li key={connector.id}>
            <button onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          </li>
        ))}
      </ul>

      <p>{address}</p>
    </div>
  );
}
