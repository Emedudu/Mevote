const { assert, expect } = require('chai')

const Booth=artifacts.require('./Booth')
// const toWei=(eth)=>{return (web3.utils.toWei(eth))}
require('chai')
    .use(require('chai-as-promised'))
    .should()

let booth;
contract('Pooling Booth',(accounts)=>{
    before(async()=>{
        booth = await Booth.deployed()
    })
    describe('Registered candidate',()=>{
        it('should register candidate successfully',()=>{
            const result1 = await booth.addContestant('Mohammadu Buhari','APC',{from:accounts[0]})
            let id1 = await booth.candidateId()
            assert.equal(id1,1)
            const result2 = await booth.addContestant('Goodluck Jonathan','PDP',{from:accounts[1]})
            let id2 = await booth.candidateId()
            assert.equal(id2,2)
            const jona=await booth.contestant(2)
            assert.equal(jona.adress,accounts[1])
            assert.equal(jona.voteCount,0)
            assert.equal(result1.logs[0].args.party,"APC")
            assert.equal(result2.logs[0].args.party,"PDP")
        })
    })
    describe('Register voter',()=>{
        it("should register voter successfully",()=>{
            const result=await booth.registerVoter({from:accounts[6]})
            assert.equal(result.logs[0].args.voterAddress,accounts[6])
            const result1=await booth.registerVoter({from:accounts[7]})
            assert.equal(result1.logs[0].args.voterAddress,accounts[7])
            const result2=await booth.registerVoter({from:accounts[8]})
            assert.equal(result2.logs[0].args.voterAddress,accounts[8])
            const result3=await booth.registerVoter({from:accounts[9]})
            assert.equal(result3.logs[0].args.voterAddress,accounts[9])
            await expect(
                booth.registerVoter({from:accounts[6]})
                ).to.be.revertedWith('voter already exists')
        })
    })
    describe('vote',()=>{
        it('shouldmake eligible voters to vote successfully',()=>{
            const result=await booth.vote(1,{from:accounts[6]})
            await expect(
                booth.vote(2,{from:accounts[6]})
            ).to.be.revertedWith('voter has already voted')
            await expect(
                booth.vote(1,{from:accounts[6]})
            ).to.be.revertedWith('voter has already voted')
            await expect(
                booth.vote(2,{from:accounts[10]})
            ).to.be.revertedWith('voter does not exist')
            const result2=await booth.vote(2,{from:accounts[7]})
            const result3=await booth.vote(2,{from:accounts[8]})
            const result4=await booth.vote(2,{from:accounts[9]})
            const jonathan=await booth.contestant(2)
            const buhari=await booth.contestant(1)
            assert.equal(jonathan.voteCount,3)
            assert.equal(buhari.voteCount,1)
            assert.equal(result.logs[0].args.party,"APC")
            assert.equal(result2.logs[0].args.party,"PDP")
            assert.equal(result3.logs[0].args.party,"PDP")
            assert.equal(result4.logs[0].args.party,"PDP")
        })
    })
})