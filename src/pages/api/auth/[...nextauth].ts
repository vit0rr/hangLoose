import UserModel from "@/models/UserModel"
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
        async signIn({ profile }) {
            await connectMongo();
            const {name, avatar_url, html_url, email, id } = profile;
            await connectMongo();
            try {
                let user = await UserModel.findOne({ githubId: id });
                if (!user) {
                    user = await UserModel.create({
                        githubId: id,
                        name,
                        avatar: avatar_url,
                        email: email ? email : id + " do not have email",
                        userUrl: html_url,
                        hasHangloose: true,
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
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

export default NextAuth(authOptions as any)