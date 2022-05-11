import React, { useState } from "react";
import Card from "./Card";

const VoteCount=({account,contracts})=>{
    let contestants=[]
    const [ids,setIds]=useState([])
    const [val,setVal]=useState(0)
    const count=(e)=>{
        e.preventDefault()
        for(let i=0;i<ids.length;i++){
            contracts!==''&&contracts.methods.getVoteeDetails(ids[i]).send({from:account})
        }
    }
    const appendNumber=(e)=>{
        if(e.key==='Enter'){
            // e.preventDefault();
            alert('enter pressed')
            setIds([...ids,val])
            setVal(0)
        }
    }
    contracts!==''&&contracts.events.ContestantDetails({})
        .on('data',event=>{
            contestants.push(event.returnValues)
        })
    contestants.sort((a,b)=>a.voteCount-b.voteCount)
    return(
        <div>
            <p>
                Be Informed that counting the votes will take time and eth.
            </p>
            <div>
                {contestants.map((obj,i)=>{
                    return <Card
                    key={i} 
                    name={obj.name}
                    party={obj.party}
                    votes={obj.votes}
                    address={obj.adress}
                    id={obj.id}/>
                    })
                    }
            </div>
            <input 
            type="number" 
            className="form-control"
            onChange={(e)=>{setVal(e.target.value)}} 
            placeholder='Enter ContestantID'
            value={val}
            />
            <button onClick={appendNumber}
            <button onClick={count}>COUNT</button>
        </div>
    )
}

export default VoteCount;