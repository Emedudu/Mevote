import React, { useEffect, useState } from "react";

const ContestantTab=({account, contracts})=>{
    const [name,setName]=useState('')
    const [party,setParty]=useState('')
    const addContestant=async()=>{
        await contracts.methods.addContestant(name.toUpperCase(),party.toUpperCase()).send({from:account})
    }
    useEffect(()=>{
        contracts!==''&&addContestant()
    },[contracts])
    return(
        <div className='container-fluid'>
            Contestant
            <input 
            type="text" 
            className="form-control" 
            onChange={(e)=>setName(e.target.value)} 
            placeholder="NAME"/>
            <input 
            type="text" 
            className="form-control" 
            onChange={(e)=>setParty(e.target.value)} 
            placeholder="PARTY"/>
            <button onClick={addContestant} type="button" className="btn btn-secondary">ADD</button>
        </div>
    )
}

export default ContestantTab;