// have function to enter the lottery
import  { abi, contractAddresses } from "../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrance() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex} = useMoralis();
  const chainId = parseInt(chainIdHex);
  const lotteryAddress = chainId in contractAddresses?  contractAddresses[chainId][0] : null;
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const dispatch = useNotification();

  const {runContractFunction: enterLottery, isLoading, isFetching} = useWeb3Contract({
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

  const {runContractFunction: getNumberofPlayers} = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress, // specify networkId
    functionName:"getNumberofPlayers",
    params: {}
  })

  const {runContractFunction: getRecentWinner} = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress, // specify networkId
    functionName:"getRecentWinner",
    params: {}
  })

  async function updateUI() {
    const entranceFeeFromCall = (await getEntranceFee())?.toString();
    setEntranceFee(entranceFeeFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      // try to read lottery entrance fee
    //  msgValue = getEntranceFee();
    updateUI();

    }
  }, [isWeb3Enabled])

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI();
  }

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell"
    })
  }

  return (
    <>
    <div className="grid grid-cols-10">
    <div className="shadow bg-white rounded mx-4 col-span-6 py-4">
    { lotteryAddress ? 
    <div className="text-slate-500 font-semibold mx-6  flex flex-col">
      Lottery entrance fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
      <button className="bg-blue-500 hover:bg-blue-700 rounded shadow text-white mt-4 px-2 " onClick={async function() {
        await enterLottery({
          onSuccess: handleSuccess,
          onError: (error) => console.log(error)
        })
        }}
        disabled={isLoading || isFetching}
        >{isLoading || isFetching ? <div className=" animate-spin spinner-border h-5 w-5 border-b-2 rounded-full"></div> : <div>Enter Lottery!</div>}</button>
    </div> : 
    <div className="text-slate-500 font-semibold mx-6">No Lottery Address Detected</div>}
    <div className="">
      <button className="bg-green-500 hover:bg-green-700 mx-6 rounded shadow text-white mt-4" onClick={async () => {
        const numPlayersFromCall = (await getNumberofPlayers())?.toString();
        setNumPlayers(numPlayersFromCall);
      }}>Number of Players</button>
      <span className="text-slate-500 font-semibold">There are {numPlayers} players entered into the lottery!</span>
    </div>
    <div className="">
      <button className="bg-teal-500 hover:bg-teal-700 mx-6 rounded shadow text-white mt-4" onClick={async () => {
        const recentWinnerFromCall = (await getRecentWinner())?.toString();
        setRecentWinner(recentWinnerFromCall);
      }}>Recent Winner</button>
      <span className="text-slate-500 font-semibold">The most recent winner of the lottery is {recentWinner}</span>
    </div>
    </div>
    </div>
    </>
  )
} 