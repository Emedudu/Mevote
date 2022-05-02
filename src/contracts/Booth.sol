pragma solidity ^0.8.0;

contract Booth{
    // contestant id
    uint public candidateId;
    // contestant struct
    struct Contestant{
        string name;
        uint voteCount;
        address adress;
    }
    // voter struct
    struct Voter{
        bool voted;
        bool exists;
    }
    // array of contestants
    Contestant[] contestants;
    // map contestant id to contestant struct
    mapping (uint=>Contestant) contestant;
    // map voterId to voter
    mapping (address=>Voter) voter;
    // add contestant
    function addContestant(string memory name)public{
        candidateId++;
        contestant[candidateId]=Contestant({
            name:name,
            voteCount:0,
            adress:msg.sender
        });
    }
    // vote
    function vote(uint id)public{
        require(id>0 && id<=candidateId,"Please enter a valid id");
        require(voter[msg.sender].exists,"voter does not exist");
        require(!voter[msg.sender].voted,"voter has already voted");
        contestant[id].voteCount+=1;
        voter[msg.sender].voted=true;
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

    }
}