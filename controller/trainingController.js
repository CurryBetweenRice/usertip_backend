const Shark = require('../models/sharkModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.upgradeShark = catchAsync(async (req, res, next) => {
    // Using timestamps: false , so whenever shark training it dont update the timestamp, i need the timestamp
    // for the shark stamina logic
    const shark = await Shark.findOne({userOwner: req.user._id})
    if(req.body.target === 'int' ||req.body.target === 'str' || req.body.target === 'spd' ){
        if(shark.stamina - 1 >= 0){
            if(req.body.target === 'int'){
                const newInt = shark.int + 1;
                const newStamina = shark.stamina - 1;
                await Shark.findOneAndUpdate({userOwner:req.user._id}, {int: newInt, stamina: newStamina}, { timestamps: false });
            }
            if(req.body.target === 'str'){
                const newStr = shark.str + 1;
                const newStamina = shark.stamina - 1;
                await Shark.findOneAndUpdate({userOwner:req.user._id}, {str: newStr, stamina: newStamina}, { timestamps: false });
            }
            if(req.body.target === 'spd'){
                const newSpd = shark.spd + 1;
                const newStamina = shark.stamina - 1;
                await Shark.findOneAndUpdate({userOwner:req.user._id}, {spd: newSpd, stamina: newStamina}, { timestamps: false });
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
    }else{
        res.status(401).json({
            status: 'failed',
            message: 'please select the valid status target'
          });
    }

    
   
    


      
})