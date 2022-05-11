// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Booth{
    // contestant id
    uint public candidateId;
    // contestant struct
    struct Contestant{
        string name;
        string party;
        uint voteCount;
        address adress;
    }
    // voter struct
    struct Voter{
        bool voted;
        bool exists;
    }
    // array of contestants
    Contestant[] public contestants;
    // map contestant id to contestant struct
    mapping (uint=>Contestant) public contestant;
    // map voterId to voter
    mapping (address=>Voter) public voter;
    // Events
    event ContestantAdded(string name, string party,uint id);
    event Voted(string name, string party, uint votes);
    event Registered(address voterAddress);
    event VoterState(bool voted,bool exists);
    event ContestantDetails(string name, string party, uint votes, address adress, uint id);
    // constructor
    // constructor(){};
    // add contestant
    function addContestant(string memory name, string memory party)public{
        candidateId++;
        contestant[candidateId]=Contestant({
            name:name,
            party:party,
            voteCount:0,
            adress:msg.sender
        });
        contestants.push(contestant[candidateId]);
        emit ContestantAdded(name,party,candidateId);
    }
    // vote
    function vote(uint id)public{
        require(id>0 && id<=candidateId,"Please enter a valid id");
        require(voter[msg.sender].exists,"voter does not exist");
        require(!voter[msg.sender].voted,"voter has already voted");
        contestant[id].voteCount+=1;
        voter[msg.sender].voted=true;
        emit Voted(contestant[id].name,contestant[id].party,contestant[id].voteCount);
    }
    // register voter
    function registerVoter()public{
        // require voter does not exist
        require(!voter[msg.sender].exists,'voter already exists');
        // register the voter
        voter[msg.sender]=Voter({
            voted:false,
            exists:true
        });
        emit Registered(msg.sender);
    }
    function getVotedState()public{
        emit VoterState(voter[msg.sender].voted, voter[msg.sender].exists);
    }
    function getVoteeDetails(uint id)public{
        emit ContestantDetails(contestant[id].name,contestant[id].party,contestant[id].voteCount,contestant[id].adress,id);
    }
}