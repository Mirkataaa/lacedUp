import { connect } from "mongoose";

export default async function mongooseInit() {
    try {
        const url = process.env.DB_URL;
        await connect(url, {dbName: 'lacedUp'});
        console.log('Successfully connect to DB!');
        
    } catch (err) {
        console.log('Cannot connect to DB!' + err.message);
        
    }
}