const assert=require('assert');
const ganache=require('ganache-cli');
const Web3=require('web3');
const web3=new Web3(ganache.provider());
console.log(web3)
const {interface ,bytecode}=require('../compile')
console.log("interface========>>",interface)
let accounts;
let inbox;

beforeEach(async ()=>{
    //Get a list of all accounts
    accounts=await web3.eth.getAccounts();
    
    // use one of this account to deploy contract
    inbox=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments:['Hii khetesh']})
    .send({ from: accounts[0], gas:'1000000'});

});

describe('Inbox',()=>{
    it('deploys a contract', ()=>{
        assert.ok(inbox.options.address);
        // console.log("inbox deployed==>>",inbox);
    });
    it('has a default message',async ()=>{
        const message=await inbox.methods.message().call();
        console.log("message=========>>>",message)
        assert.equal(message,'Hii khetesh')

    })
    it('can change the message',async ()=>{
        await inbox.methods.setMessage('bye khetesh').send({ from:accounts[0] });
        const message=await inbox.methods.message().call();
        console.log("message=========>>>",message)
        assert.equal(message,'bye khetesh')
    })
});