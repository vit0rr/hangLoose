import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    hasHangloose: {
        type: Boolean,
        required: false,
    }
})

export interface IUser extends mongoose.Document {
    name: string;
    avatar?: string;
    hasHangloose?: boolean;
}

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', Schema);
export default UserModel;