"use client";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useStarknetkitConnectModal } from "starknetkit";

export default function Navbar() {
  const { connect, connectors, connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { address } = useAccount();

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any,
  });

  const connectWallet = async () => {
    try {
      const { connector } = await starknetkitConnectModal();
      await connectAsync({ connector });
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[100px]">
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={disconnectWallet}>Disconnect</button>
      {/* <ul>
        {connectors.map((connector) => (
          <li key={connector.id}>
            <button onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          </li>
        ))}
      </ul> */}

      <p>{address}</p>
    </div>
  );
}
