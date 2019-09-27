const Web3 = require('web3');
const constant = require('../config/constants');
const web3 = new Web3(constant.rpcURL);
const BLOCK = require('./models/block');

const BLOCK_ARRAY_OBJECT = [];

const storeBlocks = async () => {
    const count = await dataExistDB();
    if (count === 0) {
        for (let i = 1757201; i < 1759999; i++) {
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
                                        storeBlocksToDB(obj);
                                    })
                            });

                    })

                })
        }
    }

}

const storeBlocksToDB = (doc) => {
    return new Promise((resolve, reject) => {
        resolve(BLOCK.create(doc));
    })
}

const dataExistDB = () => {
    return BLOCK.find().count();
}

exports.storeBlocks = storeBlocks;