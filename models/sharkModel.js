const mongoose = require('mongoose');

const sharkSchema = new mongoose.Schema({
    color:{
        type:String,
        required: [true, 'shark need color'],
        validate: [/^#[0-9A-F]{6}$/i, 'Input right hext color'],
    },
    userOwner: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Shark need owner'],
        unique: [true, 'only one shark per person']
    },
    int:{
        type: Number,
        default: 5
    },
    str: {
        type: Number,
        default: 5
    },
    spd: {
        type: Number,
        default: 5
    },
    stamina: {
        type: Number,
        default: 10,
    },
    battleWon: {
        type:Number,
        default: 0,
    }

}, {
    timestamps: {createdAt: true, updatedAt: true}
})

sharkSchema.pre(/^find/, async function(next) {
    /* 
    19 March 2022 17:16 local time, cant find a way to use pre hook so to update the shark stamina everytime the query find called
    so right now user need to do manual refresh to get thei shark stamina
    */

    
    /*
    19 March 2022 18:26 local time, after taking a short break from code, went to cut my hair to makes my head a relax a little bit, while the barber message my head, i found solution to this problem, no need manual refresh anymore
    */


    //const time = parseInt((this.updatedAt.getTime() / 1000).toFixed(0))
    // this.r = await this.findOne();

    // const timeNow = parseInt((Date.now() / 1000).toFixed(0))
    // const timePast = timeNow - time

    // if(timePast > 60){
    //     if (timePast >= 600){
    //         // await this.findOneAndUpdate({userOwner:req.user._id}, {stamina: 10});
    //         this.stamina = 10;
    //     }
    //     const staminaGain = parseInt((timePast / 60).toFixed(0));
    //     if (shark.stamina + staminaGain > 10){
    //         // await Shark.findOneAndUpdate({userOwner:req.user._id}, {stamina: 10});
    //         this.stamina = 10;
    //     }
    //     else 
    //     {
    //         // const newStamina = shark.stamina + staminaGain
    //         // await Shark.findOneAndUpdate({userOwner:req.user._id}, {stamina: newStamina})
    //         this.stamina = newStamina;
    //     }
    // }

    next();
})



const Shark = mongoose.model('Shark', sharkSchema);
module.exports = Shark;