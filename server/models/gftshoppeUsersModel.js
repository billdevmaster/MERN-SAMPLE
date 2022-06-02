const mongoose = require('mongoose');

const GftshoppeUserSchema = mongoose.Schema({
    address: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    tokens: [{
        tokenId: String,
    }]
},
{
  timestamps: true
});

const GftshoppeUser = mongoose.model('gftshoppe-user', GftshoppeUserSchema)

module.exports = GftshoppeUser;