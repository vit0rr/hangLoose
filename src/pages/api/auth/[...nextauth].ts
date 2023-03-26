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
            const { name, image, email } = session.user;
            const githubId = getGithubId(image);
            console.log("callbacks.githubId", githubId)
            console.log("callbacks.session.user", {
                name,
                image,
                email
            })

            try {
                let user = await UserModel.findOne({ githubId });
                console.log("callbacks.session.user", user)
                if (!user) {
                    console.log("callbacks.session.user.if -> do not have user",)
                    user = await UserModel.create({
                        githubId,
                        name,
                        avatar: image,
                        email,
                        hasHangloose: true,
                    });

                    console.log("callbacks.session.user.if", user)
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