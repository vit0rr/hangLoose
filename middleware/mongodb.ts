import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

export const connectMongo = async () => {
    if (mongoose.connections[0].readyState) {
        return
    }

    return mongoose.connect(process.env.MONGO_URL as string);
}

export const connectMongoMiddleware = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo()
    return handler(req, res)
};
