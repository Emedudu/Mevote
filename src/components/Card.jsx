import React from "react";

const Card=({name,party,votes,address,id})=>{
    return(
        <div className="d-flex flex-column">
            <h2>
                {name}
            </h2>
            <p>
                {party}
            </p>
            <p>
                {votes}
            </p>
            <p>
                {address}
            </p>
            <p>
                {id}
            </p>
        </div>
    )
}
export default Card;


