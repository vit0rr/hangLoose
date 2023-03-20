import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
})

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    avatar?: string;
}

const UserModel = mongoose.model<IUser>('User', Schema);
export default UserModel;