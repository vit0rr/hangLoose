import { GetServerSidePropsContext } from "next"
import NextAuth, { getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        // @ts-ignore
        async session({session}) {
            const { name, image } = session.user


            fetch(`${process.env.NEXT_PUBLIC_API}/api/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    avatar: image,
                }),
            }).catch((e) => {
                console.log(e)
            })

            return session
        }
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