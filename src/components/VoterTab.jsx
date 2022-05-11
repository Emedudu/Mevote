import React, { useEffect, useState } from "react";

const VoterTab=({account,contracts})=>{
    const [id,setId]=useState(0)
    const [exists,setExists]=useState(false)
    const [voted,setVoted]=useState(false)
    const vote=(id)=>{
        contracts.methods.vote(id)
            .send({from:account})
            .catch((err)=>console.log(err))
       
        contracts.events.Voted({})
            .on('data',event=>console.log(event.returnValues));
    }
    const registerVoter=()=>{
        contracts.methods.registerVoter()
            .send({from:account})
            .catch((err)=>console.log(err))

        contracts.events.Registered({})
            .on('data',event=>console.log(event.returnValues));
    }
    contracts!==''&&contracts.events.VoterState({})
        .on('data',event=>{
            setExists(event.returnValues.exists)
            setVoted(event.returnValues.voted)
        }
    )
    useEffect(()=>{
        contracts!==''&&contracts.methods.getVotedState().send({from:account})
    },[registerVoter,vote])   

    return(
        <div className='container-fluid d-flex flex-column justify-content-around h-100'>
            <button onClick={()=>contracts!==""&&registerVoter()} type="button" className={`btn text-primary align-self-end`} disabled={exists}>Register as voter</button>
            <input 
            type="number" 
            className="form-control" 
            onChange={(e)=>setId(e.target.value)} 
            placeholder='Enter ContestantID'
            disabled={voted}/>
            <button onClick={()=>contracts!==""&&vote(id)} type="button" className={`btn btn-primary align-self-center`} disabled={voted||!exists}>VOTE</button>
            
        </div>
    )
}

export default VoterTab;
