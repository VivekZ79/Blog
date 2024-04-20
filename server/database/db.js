import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://vivekjd0:Second2none@cblog.rqkjyp6.mongodb.net/`;
    try {
        await mongoose.connect(URL)
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;