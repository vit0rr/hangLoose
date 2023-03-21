import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

const connectDB = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }

    await mongoose.connect(process.env.MONGO_URL as string);
    return handler(req, res);
};

export default connectDB;