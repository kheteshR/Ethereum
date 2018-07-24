const path=require('path')
const fs=require('fs')
const solc=require('solc')

const inboxPath=path.resolve(__dirname,'Contract','inbox.sol')
const source=fs.readFileSync(inboxPath,'utf8')

var test=solc.compile(source,1).contracts[':Inbox']
// console.log("compiled contract",test)

module.exports=solc.compile(source,1).contracts[':Inbox']// inbox property export