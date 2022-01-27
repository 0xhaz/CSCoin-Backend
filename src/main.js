const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('f0ad23387d356244ae1483ce3e4100a460a82b2015e7e2bea69669face5138e2');
const myWalletAddress = myKey.getPublic('hex');

let CSCoin = new Blockchain();
// CSCoin.addBlock(new Block(1, "20/01/2022", { amount : 4 }));
// CSCoin.addBlock(new Block(2, "25/01/2022", { amount : 10 }));

// console.log(JSON.stringify(CSCoin, null, 4));

// console.log('Is blockchain valid? ' + CSCoin.isChainValid());

// Try to tamper the data & recalculate the hash and check if the result is return false
// CSCoin.chain[1].data = { amount : 100 };
// CSCoin.chain[1].hash = CSCoin.chain[1].calculateHash();

// console.log('Is blockchain valid? ' + CSCoin.isChainValid());

// Test mining block with difficulty
// console.log("Mining block 3...");
// CSCoin.addBlock(new Block(3, "26/01/2022", { amount : 7 }));

// console.log("Mining block 4...");
// CSCoin.addBlock(new Block(4, "27/01/2022", { amount : 14 }));

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
CSCoin.addTransaction(tx1);

// Mining reward test - create a new transaction
// CSCoin.createTransaction(new Transaction('address1', 'address2', 100));
// CSCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
CSCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Alice is', CSCoin.getBalanceOfAddress(myWalletAddress));

CSCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain Valid?', CSCoin.isChainValid());

// console.log('\n Starting the miner again...');
// CSCoin.minePendingTransactions('alice-address');

// console.log('\nBalance of Alice is', CSCoin.getBalanceOfAddress('alice-address'));