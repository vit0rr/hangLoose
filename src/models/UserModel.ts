import mongoose, { Model } from "mongoose";

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
    }, 
    email: {
        type: String,
        default: "not_provided",
    }
})

export interface IUser extends mongoose.Document {
    name: string;
    avatar?: string;
    hasHangloose?: boolean;
}

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', Schema);
export default UserModel;