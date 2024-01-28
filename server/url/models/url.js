const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    shortURL: {
        type: String,
        required: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    
    visitHistory: [ { 
        timestamp: {
            type: Number
        }, 
        ip: {
            type: String,
        },
        userAgent: {
            type: Array,
        }, 
    } ],
},
    { timestamps: true }
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL;