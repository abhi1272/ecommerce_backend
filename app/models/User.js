'use strict';
/** Module Dependencies **/
const shortid = require('shortid');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: shortid.generate(),
    index: true,
    trim:true
  },
  firstName: {
    type: String,
    default: '',
    trim:true,
    required:true
  },
  lastName: {
    type: String,
    default: '',
    trim:true
  },
  password: {
    type: String,
    trim:true,
    minlength:8,
    required:true,
    validate(value){
      if(value.toLowerCase().includes('password')){
        throw new Error('Password conanot contains password string');
      }
    }
  },
  email: {
    type: String,
    required:true,
    trim:true,
    unique:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Pass Valid email id');
      }
    }
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }],
  avatar:{
    type:Buffer
  },
},
{
  timestamps:true
}
);

// CustomerSchema.virtual('Bill',{
//   ref:'Bill',
//   localField:'_id',
//   foreignField:'owner'
// })


userSchema.methods.toJSON = function(){
  const findUser = this;

  const userObject = findUser.toObject();
  
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function(){
  let newUser = this;

  let token = jwt.sign({_id:newUser._id.toString()},process.env.JWT_SECRET);
  newUser.tokens = newUser.tokens.concat({token});
  await newUser.save();
  return token;

};

userSchema.statics.findByCredentials = async (email,password) => {

  let foundUSer = await User.findOne({email});
  if(!foundUSer){
    throw new Error('Unable to login');
  }
  let isMatch = await bcrypt.compare(password,foundUSer.password);
  if(!isMatch){
    throw new Error('Unable to login');
  }

  return foundUSer;

};

userSchema.pre('save', async function(next){
    let user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;