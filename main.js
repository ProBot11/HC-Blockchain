const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(index, timestamp, data, previoushash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.data + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block Mined: " + this.hash);
    }
}

class Blockchain {

    constructor() {
        this.chain = [this.genesisBlock()];
        this.difficulty = 4;
    }

    genesisBlock() {
        return new Block(0, "06/06/2021", "Genesis Block", "0");
    }

    lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previoushash = this.lastBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    chainValidation() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previoushash != previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let hospital = new Blockchain();

console.log("Mining Block 1....");

hospital.addBlock(new Block(1, "06/06/2021", {
    name: "Saumitra Pathak",
    age: 19,
    bloodGroup: "O+",
    address: "Vellore",
    medicalCondition: "NA"
}));

console.log("Mining Block 2....");

hospital.addBlock(new Block(2, "07/06/2021", {
    name: "Shivam Bansal",
    age: 20,
    bloodGroup: "O+",
    address: "Chennai",
    medicalCondition: "Overweight"
}));

console.log("Mining Block 3....");

hospital.addBlock(new Block(3, "07/06/2021", {
    name: "Pratyay Piyush",
    age: 20,
    bloodGroup: "O+",
    address: "Delhi",
    medicalCondition: "COVID"
}));

console.log("Mining Block 4....");

hospital.addBlock(new Block(4, "07/06/2021", {
    name: "Maurya Goyal",
    age: 29,
    bloodGroup: "O+",
    address: "Delhi",
    medicalCondition: "Weak Eyesight"
}));



console.log(JSON.stringify(hospital, null, 4));