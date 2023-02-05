// have function to enter the lottery
import  { abi, contractAddresses } from "../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function LotteryEntrance() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex} = useMoralis();
  const chainId = parseInt(chainIdHex);
  const lotteryAddress = chainId in contractAddresses?  contractAddresses[chainId][0] : null;
  const [entranceFee, setEntranceFee] = useState("0");

  const {runContractFunction: enterLottery} = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress, // specify networkId
    functionName:"enterLottery",
    params: {},
    msgValue: entranceFee
  });

  const {runContractFunction: getEntranceFee} = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress, // specify networkId
    functionName:"getEntranceFee",
    params: {}
  })

  useEffect(() => {
    if (isWeb3Enabled) {
      // try to read lottery entrance fee
    //  msgValue = getEntranceFee();
    async function updateUI() {
      const entranceFeeFromCall = (await getEntranceFee()).toString();
      setEntranceFee(entranceFeeFromCall);
    }
    updateUI();

    }
  }, [isWeb3Enabled])
  return (
    <>
    { lotteryAddress ? 
    <div className="text-slate-500 font font-semibold mx-6 mt-4 flex flex-col">
      Lottery entrance fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
      <button className="bg-red-500 rounded shadow text-white mt-4" onClick={enterLottery}>Enter Lottery</button>
    </div> : 
    <div>No Lottery Address Detected</div>}
    </>
  )
} 