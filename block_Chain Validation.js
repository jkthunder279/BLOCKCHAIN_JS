
const SHA256 = require('crypto-js/sha256');
let jk;
class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "30/06/2023", "JK", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const index = this.chain.length;
    const timestamp = new Date().toLocaleString();
    const previousHash = this.getLatestBlock().hash;
    const newBlock = new Block(index, timestamp, data, previousHash);
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
curiosity.addBlock({ amount: 1 });
curiosity.addBlock({ amount: 2 });

console.log(JSON.stringify(curiosity, null, 4));
console.log("Is blockchain valid?", curiosity.isChainValid());