import React from "react";

const Card=({name,party,votes,address,id})=>{
    return(
        <div className="card">
            <div className="card-body">
                <p className="card-title font-weight-bold">
                    Name: {name}
                </p>
                <p className="card-text font-weight-bold">
                    Party: {party}
                </p>
                <p className="card-text font-weight-normal">
                    Votes: {votes}
                </p>
                <p className="card-text font-italic">
                    Address: {address}
                </p>
                <p className="card-text font-weight-light">
                    Id: {id}
                </p>
            </div>
        </div>
    )
}
export default Card;


