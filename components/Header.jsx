import {ConnectButton} from "web3uikit";

export default function Header() {
  return (<div className="mt-4">
    <span className="text-slate-500 underline font-semibold ml-6 mb-2">Decentralized Lottery!</span>
    <ConnectButton moralisAuth={false}/>
  </div>)
}