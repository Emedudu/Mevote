import React, { useEffect, useState } from "react";

const VoterTab=({account,contracts})=>{
    const [id,setId]=useState(0)
    const vote=async(id)=>{
        try{
            contracts.methods.vote(id).send({from:account})
            contracts.events.Voted({})
                .on('data',event=>console.log(event.returnValues));
        }catch(err){           
            console.log(err)
        }
    }
    const registerVoter=async()=>{
        try{
            contracts.methods.registerVoter().send({from:account})
            contracts.events.Registered({})
                .on('data',event=>console.log(event.returnValues));
        }catch(err){
            console.log(err)
        }
    }
    
    return(
        <div className='container-fluid'>
            <input 
            type="number" 
            className="form-control" 
            onChange={(e)=>setId(e.target.value)} 
            placeholder='Enter ContestantID'/>
            <button onClick={()=>contracts!==""&&vote(id)} type="button" className="btn btn-secondary">VOTE</button>
            <button onClick={()=>contracts!==""&&registerVoter()} type="button" className="btn btn-secondary">Register as voter</button>
        </div>
    )
}

export default VoterTab;
