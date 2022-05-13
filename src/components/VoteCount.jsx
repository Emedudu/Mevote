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
            // setVal(0)
            e.target.value=''
        }
    }
    const encrypt=()=>account.toString()+Date.now().toString()
    // const getEvents=()=>{
    //     contracts!==''&&contracts.getPastEvents('ContestantDetails',{
    //         filter:{name:'YEMI'},
    //         fromBlock:1,
    //         toBlock:'latest'
    //     },(err,events)=>{
    //         if(!err){
    //             console.log(events,hash)
    //         }else{
    //             console.log(err)
    //         }
    //     })
    // } 
    let events=[]
    const getEvents=new Promise((resolve,reject)=>{
        try{
            contracts!==''&&contracts.events.ContestantDetails({})
                .on('data',event=>{
                    events.push(event)
                    events.length==cleanUp(ids)&&resolve(events)
                })
        }catch(err){
            reject('Error Occurred')
        }
    })
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
            <button onClick={(e)=>{contracts!=''&&count(e);getEvents.then((res,rej)=>console.log(res))}} type="button" className={`btn btn-primary align-self-center`}>COUNT</button>
        </div>
    )
}
export default VoteCount