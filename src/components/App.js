import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';

const App=()=> {
  const loadBlockChainData=async()=>{
    if(typeof window.ethereum!=='undefined'){
      const web3=new Web3(window.ethereum);
      const netId=await web3.eth.net.getId();
      const accounts=await web3.eth.getAccounts();
      if(typeof accounts[0] !=='undefined'){
        console.log(accounts);
        console.log(netId);
      }else{
        window.alert('Please login with metamask')
      }

    }else{
      window.alert('Please Install Metamask')
    }
  }
  useEffect(()=>{
    loadBlockChainData()
  },[loadBlockChainData])
  return (
    <div>

    </div>
  );
  
}

export default App;
