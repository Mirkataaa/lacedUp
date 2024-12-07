import jwt from "../lib/jwt.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

const userService = {
    async register(username , email , password , rePassword){
        const user = await User.findOne().or([{email} , {username}]);

        if(password !== rePassword) {
            throw new Error('Passwords missmatch!');
        }

        if(user){
            throw new Error('User already exists!');
        }

        
        const newUser = await  User.create({
            username,
            email,
            password,
            role: 'user'
        });

        return this.generateToken(newUser)
    },
    async login(email , password) {
    
        const user  = await User.findOne({email});
        console.log(user);
        
       
        if(!user) {
            throw new Error('Invalid user or password');
        }
        const isValid = await bcrypt.compare(password , user.password);
        if(!isValid) {
            throw new Error('Invalid user or password')
        }
        console.log(this.generateToken(user));
        
        return this.generateToken(user)
      
    },
    async generateToken(user) {
          const payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        };

        const header = {expiresIn: '2h'};
        const token = await jwt.sign(payload , process.env.JWT_SECRET , header);
        return token;
    }
};

export default userService;