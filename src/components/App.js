import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Booth from '../abis/Booth.json';
import logo from '../logo.png';
import './App.css';
import ContestantTab from './ContestantTab';
import VoterTab from './VoterTab';

const App=()=> {
  const [contracts,setContracts]=useState('')
  const [accounts,setAccounts]=useState('')
  const [voteTab,setVoteTab]=useState(true)
  const loadBlockChainData=async()=>{
    if(typeof window.ethereum!=='undefined'){
      let web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))
      // const url = "wss://eth-rinkeby.alchemyapi.io/v2/1BRnFkiLixmFti8qJLIOEi8X3Ep4inUf";

      // Using web3js
      // const web3 = new Web3(url);
      const netId=await web3.eth.net.getId();
      const accounts=await web3.eth.getAccounts();
      if(typeof accounts[0] !=='undefined'){
        setAccounts(accounts);
        // console.log(accounts);
        // console.log(netId);
      }else{
        window.alert('Please login with metamask')
      }
      try{
        let contract=await new web3.eth.Contract(Booth.abi,Booth.networks[netId].address);
        setContracts(contract)
        console.log(contract)
        // console.log(contract);
      }catch(err){
        window.alert("Unable to load Contracts")
      }

    }else{
      window.alert('Please Install Metamask')
    }
  }
  const setTab=(e)=>{
    e.preventDefault();
    setVoteTab(!voteTab)
  }
  useEffect(()=>{
    loadBlockChainData()
  },[])
  return (
    <div className='container-fluid border border-primary'>
      {voteTab?<VoterTab account={accounts[0]} contracts={contracts}/>:<ContestantTab account={accounts[0]} contracts={contracts}/>}
      <button onClick={setTab} type="button" className="btn btn-primary">{voteTab?'ADD CONTESTANT':'VOTE'}</button>
    </div>
  );
  
}

export default App;
