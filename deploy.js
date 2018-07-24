const HDWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3');
const {interface,bytecode}=require('./compile');
// console.log("interface=========",interface)

const provider=new HDWalletProvider(
    'fiction alarm situate depart waste rotate cave lazy mask dance horror cream',
    'https://rinkeby.infura.io/v3/ec51134c95ed4f458ef627b9fe8c0017'
);

const web3=new Web3(provider);
const deploy=async()=>{
   const accounts=await web3.eth.getAccounts();
   console.log("Attempting to deploy from account",accounts[0])
   const result=await new web3.eth.Contract(JSON.parse(interface))
   .deploy({data:bytecode,arguments:['Hiiii there!']})
   .send({gas:'1000000',from:accounts[0]});

   console.log("Contract deployed to",result.options.address)
}
deploy();