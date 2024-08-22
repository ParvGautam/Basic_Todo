import mongoose from "mongoose";

export const ConnectDB = async () => {
    const mongoURL=process.env.API_URL
    await mongoose.connect(mongoURL);
    console.log("DB Connected")
}
