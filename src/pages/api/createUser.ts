import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/models/UserModel";
import connectDB from "../../../middleware/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { name, email, avatar } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            const newUser = await UserModel.create({ name, email, avatar, hasHangloose: false });
            return res.status(200).json(newUser);
            
        } catch (error) {
            if(error) {
                return res.status(400).json(error)
            }
        }
    } else {
        return res.status(400).json({ message: 'Method not allowed' });
    }
}

export default connectDB(handler);