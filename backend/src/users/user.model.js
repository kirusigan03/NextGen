const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userShecma = new Schema({
    username: {type: String, require: true, unique:true},
    email: {type: String, require: true, unique:true},
    password: {type: String, require: true},
    role: {
        type: String, default: 'user'
    },
    profileImage: String,
    bio: {type: String, maxlength: 200},
    profession: String,
    createAt:{
        type: Date,
        default:Date.now
    }

    
});

//hashing passwords
userShecma.pre('save', async function(){
    const user = this;
    if(!user.isModified('password')) ;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    // next();
})

//match passwords
userShecma.methods.comparePassword = function (cadidatePassword) {
    return bcrypt.compare(cadidatePassword, this.password)
}

const User = new model('User', userShecma);
module.exports = User;