import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Header() {
  const {enableWeb3, account} = useMoralis();

  useEffect(() => {}, [])

  return(<div className="mx-4 my-4">
    {account ? 
  (<div className="text-slate-500 font-semibold">Connected to {account.slice(0,6)}...{account.slice(account.length - 4)}</div>) : 
    (<button className="rounded bg-slate-400 shadow px-2" onClick={async () => {
      await enableWeb3()
    }}>Connect</button>)}
  </div>)
}