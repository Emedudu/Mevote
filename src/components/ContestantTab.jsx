import React, { useEffect, useState } from "react";

const ContestantTab=({account, contracts})=>{
    const [name,setName]=useState('')
    const [party,setParty]=useState('')
    const addContestant=async()=>{
        
        contracts.methods.addContestant(name.toUpperCase(),party.toUpperCase())
            .send({from:account,gas:3000000})
            .catch((err)=>console.log(err))

        contracts.events.ContestantAdded({})
            .on('data',event=>console.log(event.returnValues.id.toString()));

    }
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
            <button onClick={()=>contracts!==''&&addContestant()} type="button" className="btn btn-secondary">ADD</button>
        </div>
    )
}

export default ContestantTab;