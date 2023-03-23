import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/models/UserModel";
import {connectMongoMiddleware} from "../../../middleware/mongodb";
import { getGithubId } from "@/utils/getGithubId";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { name, email, avatar } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const githubId = getGithubId(avatar);

        try {
            const newUser = await UserModel.create({ githubId, name, email, avatar, hasHangloose: false });
            return res.status(200).json(newUser);

        } catch (error) {
            if (error) {
                return res.status(400).json(error)
            }
        }
    } else {
        return res.status(400).json({ message: 'Method not allowed' });
    }
}

export default connectMongoMiddleware(handler);