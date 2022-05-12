import React, { useState } from "react";
import Card from "./Card";

const VoteCount=({account,contracts})=>{
    const [contestants, setContestants]=useState([])
    const [ids,setIds]=useState([])
    // const [val,setVal]=useState('')
    const count=(e)=>{
        e.preventDefault();
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
            setContestants([...contestants,
                {...event.returnValues,
                    votes:parseInt(event.returnValues.votes.toString()),
                    id:parseInt(event.returnValues.id.toString())}])
        })
    // let newContestants=contestants.map((obj,i)=>{return {...obj,votes:parseInt(obj.votes.toString())}})

    // contestants.sort((a,b)=>parseInt(a.votes.toString())-parseInt(b.votes.toString()))
    return(
        <div className='container-fluid d-flex flex-column justify-content-around h-100'>
            <p>
                Be Informed that counting the votes will take time and eth.
            </p>
            <div className='overflow-auto'>
                {console.log(contestants)}
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
            <button onClick={count} type="button" className={`btn btn-primary align-self-center`}>COUNT</button>
        </div>
    )
}
export default VoteCount