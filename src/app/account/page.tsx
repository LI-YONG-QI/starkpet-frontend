"use client";

import { useTokenbound } from "@/hooks/useTokenbound";
import { useTokens } from "@/hooks/useTokens";

const Page = () => {
  const { createAccount, isError } = useTokenbound();
  const { tokens } = useTokens();

  if (isError) return <div>Please connect first</div>;

  return (
    <div className="flex flex-col gap-y-10">
      {tokens.map((token, index) => {
        return (
          <div key={index} className="flex gap-x-3">
            <p>{token}</p>
            <button onClick={() => createAccount(token.toString())}>
              Create Account
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
