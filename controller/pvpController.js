const catchAsync = require('../utils/catchAsync');
const Shark = require('../models/sharkModel');
const AppError = require('../utils/appError');
const User = require('../models/userModels');
const BattleRoundRecord = require('../models/batRoundModel');
const BattleRecord = require('../models/batRecordModel');


// function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
//     for (var i = 0; i < 5; i++)
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
  
//     return text;
// } // This is one for generate random string for customId but i dont think its unique, so yeah.

function makeid() {
    return Date.now().toString(36) + Math.random().toString(36);
} // this one unique because using date, but the string can be absudrd

exports.pvp = catchAsync(async (req, res, next) => {
    console.log(req.body);
    
    const firstPlayer = await User.findById(req.body.playerOneId);
    const secondPlayer = await User.findById(req.body.playerTwoId);
    const firstPlayerShark = await Shark.findOne({userOwner: req.body.playerOneId})
    const secondPlayerShark = await Shark.findOne({userOwner: req.body.playerTwoId})
    const customId = makeid();


    console.log(firstPlayer);
    console.log(secondPlayer);
    // console.log(firstPlayerShark);
    // console.log(secondPlayerShark);

    const roundResult = [];

    for (let i = 0; i < 3; i++){
        roundResult[i] = await PVPBattle(firstPlayerShark, secondPlayerShark, customId)
    }
    //const result = await PVPBattle(firstPlayerShark, secondPlayerShark, 1)
    //console.log(roundResult);
    // for (let i = 0; i < 3; i++){
    //     // console.log(roundResult[i].winnerId)
    //     // console.log(firstPlayer._id)
    //     if(roundResult[i].winnerId === firstPlayer._id){
    //         player1WinCounter++;
    //     }
    //     if(roundResult[i].winnerId === secondPlayer._id){
    //         player2WinCounter++;
    //     }
    // }

    const winner = checkWhoWon(firstPlayer, secondPlayer, roundResult);
    //console.log(winner);
    //console.log(roundResult);
    const batRecord = await BattleRecord.create({
        player1Id: firstPlayer._id,
        player2Id: secondPlayer._id,
        winnerId: winner._id,
        winnerUserName: winner.username,
        round1: roundResult[0],
        round2: roundResult[1],
        round3: roundResult[2],
        customId: customId,
    })
    console.log(batRecord);
    
    const winnerShark = await Shark.findOne({userOwner: winner._id}) 
    const won = parseInt(winnerShark.battleWon + 1)

    await Shark.findOneAndUpdate({userOwner:winner._id}, {battleWon: won })





    res.status(201).json({
        status: 'success',
        data: {
            batRecord
        }
      });



})

function checkWhoWon(player1, player2, roundResult){
    let player1WinCounter = 0;
    let player2WinCounter = 0;
    for (let i = 0; i < 3; i++){
        if(roundResult[i].winnerId.toString() === player1._id.toString()){
            player1WinCounter++;
        }
        if(roundResult[i].winnerId.toString() === player2._id.toString()){
            player2WinCounter++;
        }
    }
    // console.log(player1WinCounter);
    // console.log(player2WinCounter);
    if(player1WinCounter > player2WinCounter){
        return player1;
    }else {
        return player2;
    }

}

function randomIntFromInterval() { // min and max included 
    return Math.floor(Math.random() * 4)
}
function tieBreaker() { // min and max included 
    return Math.floor(Math.random() * 2) + 1
  }


const PVPBattle = async (shark1, shark2, customId) => {
    
    //1 = int , 2 = str, 3 = spd
    //int > str 1 2
    //str > spd 2 3
    //spd > int 3 1

    //console.log(round)
    let theData;

    let winner;
    const player1Choice = Math.floor(Math.random() * 3) + 1;
    const player2Choice = Math.floor(Math.random() * 3) + 1;
    // console.log(player1Choice);
    // console.log(player2Choice);
    // console.log(shark1)
    // console.log(shark2)

   if(player1Choice === 1){ // int
        
       if(player2Choice === 1){ // int
       
           if(shark1.int === shark2.int){
            const theTieBreaker = tieBreaker();
            console.log(theTieBreaker);
            if(theTieBreaker === 1 ){
                theData = await BattleRoundRecord.create({
                    player1Stat: 'int',
                    player1StatVal: shark1.int,
                    player2Stat: 'int',
                    player2StatVal: shark2.int,
                    winnerId: shark1.userOwner,
                    battleId: customId
                })
            }
            else if(theTieBreaker === 2){
                theData = await BattleRoundRecord.create({
                    player1Stat: 'int',
                    player1StatVal: shark1.int,
                    player2Stat: 'int',
                    player2StatVal: shark2.int,
                    winnerId: shark2.userOwner,
                    battleId: customId
                })
            }
           }
           if(shark1.int > shark2.int){
            theData = await BattleRoundRecord.create({
                player1Stat: 'int',
                player1StatVal: shark1.int,
                player2Stat: 'int',
                player2StatVal: shark2.int,
                winnerId: shark1.userOwner,
                battleId: customId
            })
           }
           if(shark1.int < shark2.int){
            theData = await BattleRoundRecord.create({
                player1Stat: 'int',
                player1StatVal: shark1.int,
                player2Stat: 'int',
                player2StatVal: shark2.int,
                winnerId: shark2.userOwner,
                battleId: customId
            })
           }
       }
       if(player2Choice === 2){ // str
        
           let winner = shark1;
           theData = await BattleRoundRecord.create({
               player1Stat: 'int',
               player1StatVal: shark1.int,
               player2Stat: 'str',
               player2StatVal: shark2.str,
               winnerId: shark1.userOwner,
               battleId: customId
           })

       }
       if(player2Choice === 3){ // spd
        
           let winner = shark2;
           theData = await BattleRoundRecord.create({
            player1Stat: 'int',
            player1StatVal: shark1.int,
            player2Stat: 'spd',
            player2StatVal: shark2.spd,
            winnerId: shark2.userOwner,
            battleId: customId
        })
       } 
   }

   if(player1Choice === 2){ // str
    
    if(player2Choice === 1){ // int
        
        let winner = shark2;
        theData = await BattleRoundRecord.create({
            player1Stat: 'str',
            player1StatVal: shark1.str,
            player2Stat: 'int',
            player2StatVal: shark2.int,
            winnerId: shark2.userOwner,
            battleId: customId
        })
    }
    if(player2Choice === 2){ // str
        
        if(shark1.str === shark2.str){
            const theTieBreaker = tieBreaker()
            if(theTieBreaker === 1 ){
                theData = await BattleRoundRecord.create({
                    player1Stat: 'str',
                    player1StatVal: shark1.str,
                    player2Stat: 'str',
                    player2StatVal: shark2.str,
                    winnerId: shark1.userOwner,
                    battleId: customId
                })
            }
            else if(theTieBreaker === 2){
                theData = await BattleRoundRecord.create({
                    player1Stat: 'str',
                    player1StatVal: shark1.str,
                    player2Stat: 'str',
                    player2StatVal: shark2.str,
                    winnerId: shark2.userOwner,
                    battleId: customId
                })
            }
        }
        if(shark1.str > shark2.str){
            theData = await BattleRoundRecord.create({
                player1Stat: 'str',
                player1StatVal: shark1.str,
                player2Stat: 'str',
                player2StatVal: shark2.str,
                winnerId: shark1.userOwner,
                battleId: customId
            })
           }
           if(shark1.str < shark2.str){
            theData = await BattleRoundRecord.create({
                player1Stat: 'str',
                player1StatVal: shark1.int,
                player2Stat: 'str',
                player2StatVal: shark2.str,
                winnerId: shark2.userOwner,
                battleId: customId
            })
           }
    }
    if(player2Choice === 3){ //spd
        
        let winner = shark1;
        theData = await BattleRoundRecord.create({
            player1Stat: 'str',
            player1StatVal: shark1.str,
            player2Stat: 'spd',
            player2StatVal: shark2.spd,
            winnerId: shark1.userOwner,
            battleId: customId
        })
    } 

}

if(player1Choice === 3){ // spd
    
    if(player2Choice === 1){// int
       
        let winner = shark1;
        theData = await BattleRoundRecord.create({
            player1Stat: 'spd',
            player1StatVal: shark1.spd,
            player2Stat: 'int',
            player2StatVal: shark2.int,
            winnerId: shark1.userOwner,
            battleId: customId
        })
    }
    if(player2Choice === 2){// str
       
        let winner = shark2;
        theData = await BattleRoundRecord.create({
            player1Stat: 'spd',
            player1StatVal: shark1.int,
            player2Stat: 'str',
            player2StatVal: shark2.str,
            winnerId: shark1.userOwner,
            battleId: customId
        })
    }
    if(player2Choice === 3){ // spd
        if(shark1.spd === shark2.spd){
            
            const theTieBreaker = tieBreaker()
            if(theTieBreaker === 1 ){
                theData = await BattleRoundRecord.create({
                    player1Stat: 'spd',
                    player1StatVal: shark1.spd,
                    player2Stat: 'spd',
                    player2StatVal: shark2.spd,
                    winnerId: shark1.userOwner,
                    battleId: customId
                })
            }
            else if(theTieBreaker === 2){
                theData = await BattleRoundRecord.create({
                    player1Stat: 'spd',
                    player1StatVal: shark1.spd,
                    player2Stat: 'spd',
                    player2StatVal: shark2.spd,
                    winnerId: shark2.userOwner,
                    battleId: customId
                })
            }
        }
        if(shark1.spd > shark2.spd){
            theData = await BattleRoundRecord.create({
                player1Stat: 'spd',
                player1StatVal: shark1.spd,
                player2Stat: 'spd',
                player2StatVal: shark2.spd,
                winnerId: shark1.userOwner,
                battleId: customId
            })
           }
           if(shark1.spd < shark2.spd){
            theData = await BattleRoundRecord.create({
                player1Stat: 'spd',
                player1StatVal: shark1.spd,
                player2Stat: 'spd',
                player2StatVal: shark2.spd,
                winnerId: shark2.userOwner,
                battleId: customId
            })
           }
    } 
}

return theData;




}

exports.getListBattles = catchAsync(async(req, res, next) => {
    const battles = await BattleRecord.find({$or:[{player1Id: req.params.id}, {player2Id: req.params.id}]})
    
    res.status(201).json({
        status: 'success',
        total: battles.length,
        data: {
            battles
        }
      });

})

exports.getOwnListBattles = catchAsync(async(req, res, next) => {
    const battles = await BattleRecord.find({$or:[{player1Id: req.user.id}, {player2Id: req.user.id}]})

    res.status(201).json({
        status: 'success',
        total: battles.length,
        data: {
            battles
        }
      });

})