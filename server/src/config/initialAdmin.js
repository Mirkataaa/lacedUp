import User from "../models/User.js";

export async function seedAdmin() {
    const adminExists = await User.findOne({username: 'administrator'});

    if(!adminExists) {
        const admin = new User({
            username: 'administrator',
            email: 'administrator@gmail.com',
            password: 'administrator' , 
            role: 'admin',
        });

        await admin.save();
        console.log('Admin user created: administrator/administrator');
    } else {
        console.log('Admin user already exists.');
    }   
}