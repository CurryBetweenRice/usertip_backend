const Shark = require('../models/sharkModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/APIFeature');

exports.postShark = catchAsync(async (req, res, next) => {
    const newShark = await Shark.create({
        color: req.body.color,
    })
    res.status(201).json({
        status: 'success',
        data: {
          newShark,
        },
      });
})

exports.getShark = catchAsync(async (req, res, next) => {
    const shark =  await Shark.find({userOwner: req.user._id});
    console.log(shark);


    res.status(201).json({
        status: 'success',
        data: {
          shark,
        },
      });
})

exports.getSharkById = catchAsync(async(req, res, next) => {
    const shark = await Shark.find({_id: req.params.id});

    res.status(201).json({
        status: 'success',
        data: {
          shark,
        },
      });
})




/**
 * To refresh shark stamina
 */
exports.refreshSharkStamina = catchAsync(async (req, res, next) => {
    const shark = await Shark.findOne({userOwner: req.user._id})
    const time = parseInt((shark.updatedAt.getTime() / 1000).toFixed(0))
    const timeNow = parseInt((Date.now() / 1000).toFixed(0))
    const timePast = timeNow - time

    if(timePast > 60){
        if (timePast >= 600){
            await Shark.findOneAndUpdate({userOwner:req.user._id}, {stamina: 10});
        }
        const staminaGain = parseInt((timePast / 60).toFixed(0));
        if (shark.stamina + staminaGain > 10){
            await Shark.findOneAndUpdate({userOwner:req.user._id}, {stamina: 10});
        }
        else 
        {
            const newStamina = shark.stamina + staminaGain
            await Shark.findOneAndUpdate({userOwner:req.user._id}, {stamina: newStamina})
        }
    }

next()
    
})

exports.getTopFiveShark = catchAsync(async(req, res, next) => {
    const shark = await Shark.find({}).limit(5).sort({battleWon: -1})

    res.status(201).json({
        status: 'success',
        data: {
          shark
        },
      });
})