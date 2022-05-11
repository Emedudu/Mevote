import React from "react";

const Card=({name,party,votes,address,id})=>{
    return(
        <div>
            {name}
            {party}
            {votes}
            {address}
            {id}
        </div>
    )
}
export default Card;