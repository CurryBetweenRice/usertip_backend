const mongoose = require('mongoose');

const battleRoundSchema = new mongoose.Schema({
    player1Stat: String,
    player1StatVal: Number,
    player2Stat: String,
    player2StatVal: Number,
    winnerId: {
        type:mongoose.Schema.ObjectId
    },
    winnerUsername: String,
    battleId: {
        type: String,
    }

})

const BattleRoundRecord = mongoose.model('BattleRoundRecord', battleRoundSchema);
module.exports = BattleRoundRecord;
