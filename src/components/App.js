import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Booth from '../abis/Booth.json';
import logo from '../logo.png';
import './App.css';
import ContestantTab from './ContestantTab';
import VoteCount from './VoteCount';
import VoterTab from './VoterTab';

const App=()=> {
  const [contracts,setContracts]=useState('')
  const [accounts,setAccounts]=useState('')
  const [voteTab,setVoteTab]=useState(1)

  const loadBlockChainData=async()=>{
    if(typeof window.ethereum!=='undefined'){
      const web3 = await new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'))
      // const url = `wss://eth-rinkeby.alchemyapi.io/v2/${tokenKey}`;

      // Using web3js
      // const web3 = new Web3(url);
      window.ethereum.enable();
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
    setVoteTab(1)
  }
  const setContestantTab=(e)=>{
    e.preventDefault();
    setVoteTab(2)
  }
  const setVoteCountTab=(e)=>{
    e.preventDefault();
    setVoteTab(3)
  }
  useEffect(()=>{
    loadBlockChainData()
  },[])
  return (
    <div className='row full-height'>

    <div className='container col-md-8 d-flex flex-column justify-content-between shadow-lg mb-5 bg-white rounded h-50'>
      <nav className='navbar row'>
        <button onClick={setTab} type="button" className={`btn col-4 ${voteTab==1&&'text-primary'}`}>VOTE</button>
        <button onClick={setContestantTab} type="button" className={`btn col-4 ${voteTab==2&&'text-primary'}`}>ADD CONTESTANT</button>
        <button onClick={setVoteCountTab} type="button" className={`btn col-4 ${voteTab==3&&'text-primary'}`}>COUNT VOTES</button>
      </nav>
      <div className='h-100'>
        {
          (voteTab==1)&&<VoterTab account={accounts[2]} contracts={contracts}/>
        }
        {
          (voteTab==2)&&<ContestantTab account={accounts[0]} contracts={contracts}/>
        }
        {
          (voteTab==3)&&<VoteCount account={accounts[0]} contracts={contracts}/>
        }
      </div>
    </div>
    </div>
    
  );
  
}

export default App;
