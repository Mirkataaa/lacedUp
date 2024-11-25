import { Schema , model } from "mongoose";
import bcypt from 'bcrypt';
const SALT_ROUNDS = 10;


const userSchema = new Schema({
    username: {
        type: String,
        required:[true , 'Username is required!'],
        minLength: [2, 'Username is too short!'],
        maxLength: [20, 'Username is too long!'],
    },
    email: {
        type: String,
        required:[true, 'Email is required!'],
        minLength: [10, 'Email is too short!'],
    },
    password: {
        type: String,
        required:[true, 'Password is required!'],
        minLength: [4, 'Password is too short!']
    },
    favoriteList: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    
});

userSchema.pre('save' , async function () {
    const hash = await bcypt.hash(this.password , SALT_ROUNDS);

    this.password = hash;
})

const User = model('User' , userSchema);

export default User;