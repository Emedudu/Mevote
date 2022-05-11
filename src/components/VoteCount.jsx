import React, { useState } from "react";
import Card from "./Card";

const VoteCount=({account,contracts})=>{
    let contestants=[]
    const [ids,setIds]=useState([])
    // const [val,setVal]=useState('')
    const count=(e)=>{
        e.preventDefault();
        console.log(cleanUp(ids))
        let cleanIds=cleanUp(ids)
        for(let i=0;i<cleanIds.length;i++){
            contracts!==''&&contracts.methods.getVoteeDetails(cleanIds[i]).send({from:account})
        }
    }
    const cleanUp=(arr)=>{
        return arr.filter(
            (elem)=>elem!=='').map(
                (elem)=>parseInt(elem))
    }
    const appendNumber=(e)=>{
        if(e.key==='Enter'){
            e.preventDefault();
            let val=e.target.value
            setIds([...ids,val])
            // setVal(0)
            e.target.value=''
        }
    }
    contracts!==''&&contracts.events.ContestantDetails({})
        .on('data',event=>{
            contestants.push(event.returnValues)
            console.log(contestants)
        })
    contestants.sort((a,b)=>parseInt(a.voteCount.toString())-parseInt(b.voteCount.toString()))
    return(
        <div className='container-fluid d-flex flex-column justify-content-around h-100'>
            <p>
                Be Informed that counting the votes will take time and eth.
            </p>
            <div>
                {contestants.map((obj,i)=>{
                    return <Card
                    key={i} 
                    name={obj.name}
                    party={obj.party}
                    votes={obj.votes.toString()}
                    address={obj.adress}
                    id={obj.id.toString()}/>
                    })
                    }
            </div>
            <input 
            type="number" 
            className="form-control"
            // onChange={(e)=>{setVal(e.target.value)}} 
            onKeyPress={appendNumber}
            placeholder='Enter ContestantID'
            // value={val}
            />
            <button onClick={count} type="button" className={`btn btn-primary align-self-center`}>COUNT</button>
        </div>
    )
}

export default VoteCount