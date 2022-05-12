import React, { useEffect, useState } from "react";
import Card from "./Card";

const VoteCount=({account,contracts})=>{
    const [contestants, setContestants]=useState([])
    const [ids,setIds]=useState([])
    let hash
    const count=(e)=>{
        e.preventDefault();
        let cleanIds=cleanUp(ids)
        hash=encrypt()
        for(let i=0;i<cleanIds.length;i++){
            contracts.methods.getVoteeDetails(cleanIds[i],hash).send({from:account})
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
    const encrypt=()=>account.toString()+Date.now().toString()
    const getEvents=()=>{
        contracts!==''&&contracts.getPastEvents('ContestantDetails',{
            filter:{encryption:hash},
            fromBlock:0
        },(err,events)=>{console.log(events.map((elem)=>elem.returnValues.encryption),hash)})
    } 
    return(
        <div className='container-fluid d-flex flex-column justify-content-around h-100'>
            <p>
                Be Informed that counting the votes will take time and eth.
            </p>
            <div className='overflow-auto'>
                {contestants.map((obj,i)=>{
                    return i
                    // return <Card
                    // key={i} 
                    // name={obj.name}
                    // party={obj.party}
                    // votes={obj.votes.toString()}
                    // address={obj.adress}
                    // id={obj.id.toString()}/>
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
            <button onClick={(e)=>{contracts!=''&&count(e);setTimeout(getEvents,cleanUp(ids).length*1000)}} type="button" className={`btn btn-primary align-self-center`}>COUNT</button>
        </div>
    )
}
export default VoteCount