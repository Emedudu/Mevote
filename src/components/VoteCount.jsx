import React, { useState } from "react";
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
    const cleanUp=(arra)=>{
        const set=new Set(arra)
        const arr=[...set]
        return arr.filter(
            (elem)=>elem!=='').map(
                (elem)=>parseInt(elem))
    }
    const appendNumber=(e)=>{
        if(e.key==='Enter'){
            e.preventDefault();
            let val=e.target.value
            setIds([...ids,val])
            e.target.value=''
        }
    }
    const encrypt=()=>account.toString()+Date.now().toString()
    
    const getEvents=new Promise((resolve,reject)=>{
        let events=[]
        try{
            contracts&&contracts.events.ContestantDetails({filter:{encryption:hash}})
                .on('data',event=>{
                    events.push(event)
                    events.length==cleanUp(ids).length&&resolve(events)
                })
        }catch(err){
            reject('Error Occurred')
        }
    })
    const assignValue=()=>{
        getEvents.then(
            (res)=>{
                setContestants(res.map((elem)=>elem.returnValues))
            },
            (rej)=>{
                console.log(rej)
            })
    }
    const sort=()=>{
        let sortedContestants=contestants.slice(0).sort((a,b)=>parseInt(b.votes.toString())-parseInt(a.votes.toString()))
        setContestants(sortedContestants)
    }
    return(
        <div className='container-fluid d-flex flex-column justify-content-around h-100'>
            <p>
                Be Informed that counting the votes will take time and eth.
            </p>
            <button onClick={sort} type="button" className={`btn btn-secondary align-self-center`} disabled={!contestants.length}>SORT</button>
            <div className='overflow-auto mh-50'style={{'height':'200px'}}>
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
            onKeyPress={appendNumber}
            placeholder='Enter ContestantID'
            />
            <button onClick={(e)=>{contracts&&account&&count(e);assignValue()}} type="button" className={`btn btn-primary align-self-center`} disabled={!ids.length}>COUNT</button>
        </div>
    )
}
export default VoteCount