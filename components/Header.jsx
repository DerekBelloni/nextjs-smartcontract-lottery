import {ConnectButton} from "web3uikit";

export default function Header() {
  return (
  <div className="mt-4 flex flex-row justify-between">
    <span className="text-slate-500 underline font-semibold ml-6 text-xl">Decentralized Lottery!</span>
    <div className="">
      <ConnectButton moralisAuth={false}/>
    </div>
  </div>)
}