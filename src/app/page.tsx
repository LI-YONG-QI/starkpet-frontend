"use client";

import { useTokens } from "@/hooks/useTokens";

export default function Home() {
  const { tokens } = useTokens();

  return (
    <main>
      Home
      {tokens.map((token, index) => {
        return <div key={index}>{token}</div>;
      })}
    </main>
  );
}
