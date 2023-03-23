import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/models/UserModel";
import {connectMongoMiddleware} from "../../../middleware/mongodb";
import { getGithubId } from "@/utils/getGithubId";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { name, avatar } = req.body;

        const githubId = getGithubId(avatar);

        try {
            const newUser = await UserModel.create({ githubId, name, avatar, hasHangloose: false });
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