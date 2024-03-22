import mongoose from "mongoose";

async function connectDB(){
    const isConnect = await mongoose.connect(process.env.MONGO_URL)

    if(isConnect) {
        console.log(`Database connected`);
    }else{
        console.log(`Not`);
    }
}

export {
    connectDB
}