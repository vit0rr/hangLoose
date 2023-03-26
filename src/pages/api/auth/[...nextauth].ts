import UserModel from "@/models/UserModel"
import { getGithubId } from "@/utils/getGithubId"
import { GetServerSidePropsContext } from "next"
import NextAuth, { getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { connectMongo } from "../../../../middleware/mongodb"

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        // @ts-ignore
        async session({ session }) {
            await connectMongo();
            const { name, image } = session.user;
            const githubId = getGithubId(image);

            try {
                let user = await UserModel.findOne({ githubId });
                if (!user) {
                    user = await UserModel.create({
                        githubId,
                        name,
                        avatar: image,
                        hasHangloose: false,
                    });
                }
                return session;
            } catch (error) {
                console.log(error);
                return session;
            }
        },
    },
    secret: process.env.SECRET as string,
}

export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};

export default NextAuth(authOptions)