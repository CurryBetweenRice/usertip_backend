const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Shark = require('../models/sharkModel');
const reader = require('readline-sync');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username require'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'Password require'],
        minlength: 8,
        select: false,
    },
    sharkColor:{
        type: String,
        require: [true, 'Shark need color']
    },
    sharkId:{
        type:mongoose.Schema.ObjectId,
    }},
    {
        timestamps: {createdAt: true, updatedAt: false}
    });


userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function(next) {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

userSchema.pre('save', async function(next) {
    if(!this.sharkColor){
        const randomColor = random_hex_color_code();
        this.sharkColor = randomColor;
        const newShark = await Shark.create({
            color: randomColor,
            userOwner: this._id,
        })
        this.sharkId = newShark._id;
    }
    
    next();
} )

const User = mongoose.model('User', userSchema);
module.exports = User;
