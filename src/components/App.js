import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Booth from '../abis/Booth.json';
import logo from '../logo.png';
import './App.css';
import ContestantTab from './ContestantTab';
import VoterTab from './VoterTab';

const App=()=> {
  const [accounts,setAccounts]=useState('')
  const [contract,setContract]=useState('')
  const [voteTab,setVoteTab]=useState(true)
  const loadBlockChainData=async()=>{
    if(typeof window.ethereum!=='undefined'){
      const web3=new Web3(window.ethereum);
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
        const booth=new web3.eth.Contract(Booth.abi,Booth.networks[netId].address);
        setContract(booth);
        console.log(booth);
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
      {voteTab?<VoterTab account={accounts[0]} contract={contract}/>:<ContestantTab account={accounts[0]} contract={contract}/>}
      <button onClick={setTab} type="button" className="btn btn-primary">{voteTab?'ADD CONTESTANT':'VOTE'}</button>
    </div>
  );
  
}

export default App;
