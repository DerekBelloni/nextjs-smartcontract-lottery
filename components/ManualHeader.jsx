import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Header() {
  const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis();

  useEffect(() => { // automatically runs on load, then it'll run checking the value
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
    console.log("HI!")
    console.log(isWeb3Enabled)
  }, [isWeb3Enabled])
  // no dependancy array: run anytime something re-renders
  // Careful when doing this, it can lead to circular re-renders
  // blank dependancy array runs once on load

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    })
  }, [])

  return(<div className="mx-4 my-4">
    {account ? 
  (<div className="text-slate-500 font-semibold">Connected to {account.slice(0,6)}...{account.slice(account.length - 4)}</div>) : 
    (<button className="rounded bg-slate-400 shadow px-2" 
    onClick={async () => {
      await enableWeb3()
      if (typeof window !== "undefined") {
        window.localStorage.setItem("connected", "inject")
      }}}
    disabled={isWeb3EnableLoading}>Connect</button>)}
  </div>)
}
