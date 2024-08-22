import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://Parv:Parv%401234@cluster0.fvyz4ih.mongodb.net/todo-app');
    console.log("DB Connected")
}
