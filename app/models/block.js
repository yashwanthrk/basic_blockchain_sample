const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blockSchema = new Schema(
    {
        from: { type: String, required: false },
        to: { type: String, required: false },
        blockNumber: { type: Number, required: false },
        hash: { type: String, required: false },
        address: { type: String, required: false }
    }, { timestamps: true }
)


blockSchema.index({ "address": 1 })


module.exports = mongoose.model("blocks", blockSchema)

