const BLOCK_QUERY = require("../queries/block");


const RESPONSE = {
    requestStatus: 1,
    message: ""
}


module.exports = {

    storeBlocks: async (req, res) => {
        try {
            let response = {
                ...RESPONSE
            };
            const blocks = await BLOCK_QUERY.addBlock(12, 14);
            console.log(blocks);
            response.requestStatus = 1
            response.message = "Blocks successfully added"
            return res.status(200).json(response)
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                Error: "Internal server error"
            });
        }
    },

    getAllTransaction: async (req, res) => {
        try {
            let response = {
                ...RESPONSE
            };
            const allBlocks = await BLOCK_QUERY.getAllBlocks();
            response.requestStatus = 1
            response.data = allBlocks;
            response.message = "All blocks successfully fetched"
            return res.status(200).json(response)
        } catch (err) {
            console.log("Error in group request", err.stack)
            return res.status(500).json({
                Error: "Internal server error"
            })
        }
    },
    getTransactionForAddress: async (req, res) => {
        try {
            let response = {
                ...RESPONSE
            };
            const { address } = req.body;
            const allBlocks = await BLOCK_QUERY.getAllBlocksForAddress(address);
            response.requestStatus = 1
            response.data = allBlocks;
            response.message = "All blocks successfully fetched"
            return res.status(200).json(response)
        } catch (err) {
            console.log("Error in group request", err.stack)
            return res.status(500).json({
                Error: "Internal server error"
            })
        }
    },

}