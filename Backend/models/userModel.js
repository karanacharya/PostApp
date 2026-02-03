const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
     fullname:{
       type:String,
       required: [true, 'Full name is required'],
       minLength: [3, 'Full name must be at least 3 characters'],
       trim:true
     },
     username:{
       type:String,
       required: [true, 'Username is required'],
       unique: true,
       minLength: [3, 'Username must be at least 3 characters'],
       trim:true
     },
     email:{
       type:String,
       required: [true, 'Email is required'],
       unique: true,
       lowercase: true,
       trim:true,
       match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
     },
     password:{
       type:String,
       required: [true, 'Password is required'],
       minLength: [6, 'Password must be at least 6 characters']
     }
}, {
     timestamps: true
})

module.exports = mongoose.model("user", userSchema);