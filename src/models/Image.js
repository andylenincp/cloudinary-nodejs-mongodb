const {Schema, model} = require('mongoose')

const imageSchema = new Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: String
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('Image', imageSchema)