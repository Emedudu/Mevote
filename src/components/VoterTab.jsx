import React, { useEffect } from "react";

const VoterTab=({account,contracts})=>{
    let exists,voted
    const getVoterState=async()=>{
        const voter=await contracts.methods.getVotedState().call({from:account})
        console.log(voter)
    }
    useEffect(()=>{
        contracts!==''&&getVoterState()
        contracts.events.VoterState({})
            .on('data', async function(event){
                console.log(event.returnValues);
                // Do something here
            })
            .on('error', console.error);
    },[contracts])
    return(
        <div className='container-fluid'>
        Voter
        {`${exists},${voted}`}
        </div>
    )
}

export default VoterTab;
