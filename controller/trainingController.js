const Shark = require('../models/sharkModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.upgradeShark = catchAsync(async (req, res, next) => {
    
    //const shark = await Shark.findOne({userOwner: req.user._id});
    const shark = await Shark.findOne({userOwner: req.user._id})
    if(shark.stamina - 1 >= 0){
        if(req.body.target === 'int'){
            const newInt = shark.int + 1;
            const newStamina = shark.stamina - 1;
            await Shark.findOneAndUpdate({userOwner:req.user._id}, {int: newInt, stamina: newStamina});
        }
        if(req.body.target === 'str'){
            const newStr = shark.str + 1;
            const newStamina = shark.stamina - 1;
            await Shark.findOneAndUpdate({userOwner:req.user._id}, {str: newStr, stamina: newStamina});
        }
        if(req.body.target === 'spd'){
            const newSpd = shark.spd + 1;
            const newStamina = shark.stamina - 1;
            await Shark.findOneAndUpdate({userOwner:req.user._id}, {spd: newSpd, stamina: newStamina});
        }
    }else{
        return next(new AppError('Your shark is tired', 400));
    }
    const newShark = await Shark.findOne({userOwner: req.user._id})
   

    
    res.status(201).json({
        status: 'success',
        data: {
            newShark
        }
      });
})