import React, { useState } from "react";

const ContestantTab=({account, contracts})=>{
    const [name,setName]=useState('')
    const [party,setParty]=useState('')
    const addContestant=async()=>{        
        contracts&&account&&contracts.methods.addContestant(name.toUpperCase(),party.toUpperCase())
            .send({from:account,gas:3000000})
            .catch((err)=>console.log(err))
        setName('')
        setParty('')
        contracts&&contracts.events.ContestantAdded({})
            .on('data',event=>window.alert(event.returnValues.id.toString()));
    }
    return(
        <div className='container-fluid d-flex flex-column justify-content-around h-100'>
            
            <input 
            type="text" 
            className="form-control" 
            onChange={(e)=>setName(e.target.value)} 
            placeholder="NAME"
            value={name}/>
            <input 
            type="text" 
            className="form-control" 
            onChange={(e)=>setParty(e.target.value)} 
            placeholder="PARTY"
            value={party}/>
            <button onClick={()=>contracts&&addContestant()} type="button" className="btn btn-primary align-self-center">ADD</button>
        </div>
    )
}
export default ContestantTab;