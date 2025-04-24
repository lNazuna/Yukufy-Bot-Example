const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.models.test || mongoose.model('test', testSchema);