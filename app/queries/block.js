
const Web3 = require('web3');
const constant = require('../../config/constants');
const web3 = new Web3(constant.rpcURL);
const BLOCK = require('../models/block');


const addBlock = async (rangeArrayFrom = 1757201, rangeArrayTo = 1757202) => {
    const BLOCK_ARRAY_OBJECT = [];
    return new Promise((resolve, reject) => {
        for (let i = rangeArrayFrom; i < rangeArrayTo; i++) {
            const obj = {}
            web3.eth.getBlock(i)
                .then(block => {
                    block.transactions.forEach(data => {
                        web3.eth.getTransaction(data)
                            .then(result => {
                                // console.log(result)
                                obj.from = result.from;
                                obj.to = result.to;
                                obj.hash = result.hash;
                                obj.blockNumber = i;
                                web3.eth.getTransactionReceipt(result.hash)
                                    .then(address => {
                                        obj.address = address.contractAddress;
                                        BLOCK_ARRAY_OBJECT.push(obj);
                                        console.log(BLOCK_ARRAY_OBJECT);
                                    })
                            });

                    })

                })
        }
    })
}

const getAllBlocks = () => {
    return BLOCK.find();
}

const getAllBlocksForAddress = (address) => {
    return BLOCK.find({address}).lean();
}

const addTransactionsToDB = (obj) => {
    return BLOCK.insertMany(obj);
}

const getTransactionFromBLock = (blockTransactions) => {
    return new Promise((resolve, reject) => {
        blockTransactions.forEach(data => {
            resolve(web3.eth.getTransaction(data));
        })
    });
}

const getAddressForHash = (hash) => {
    return new Promise((resolve, reject) => {
        web3.eth.getTransactionReceipt(hash);
    });
}


exports.addBlock = addBlock;
exports.getAllBlocks = getAllBlocks;
exports.getAllBlocksForAddress = getAllBlocksForAddress;
