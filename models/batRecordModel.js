const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
    player1Id:{
        type: mongoose.Schema.ObjectId, 
    },
    player2Id:{
        type: mongoose.Schema.ObjectId,
    },
    winnerId:{
        type: mongoose.Schema.ObjectId,
    },
    winnerUserName:{
        type: String,
    },
    round1:{
    },
    round2:{
    },
    round3:{
    },
    customId:{
        type: String,
    }

},
{
    timestamps: {createdAt:true, updatedAt: false}
})

const BattleRecord = mongoose.model('BattleRecord', battleSchema);
module.exports = BattleRecord;
