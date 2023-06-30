const SHA256 = require('crypto-js/sha256');
let jk;
class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.nonce + this.previousHash).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
  }

  createGenesisBlock() {
    return new Block(0, "30/06/2023", "JK", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data, timestamp) {
    const index = this.chain.length;
    const previousHash = this.getLatestBlock().hash;
    const newTimestamp = new Date(timestamp).toLocaleString();
    const newBlock = new Block(index, newTimestamp, data, previousHash);
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let curiosity = new Blockchain();

curiosity.addBlock({ amount: 6 }, "2023-07-02");

console.log(JSON.stringify(curiosity, null, 4));
console.log("Is blockchain valid?", curiosity.isChainValid());

console.log('Mining Block 1:');
curiosity.addBlock({ amount: 4 }, "2023-07-05");

console.log('Mining Block 2:');
curiosity.addBlock({ amount: 10 }, "2023-07-10");



