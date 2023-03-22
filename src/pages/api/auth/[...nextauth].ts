import NextAuth from "next-auth"
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
        async signIn(params) {
            const { email, name } = params.user

            console.log("nicolas")
            fetch(`${process.env.NEXT_PUBLIC_API}/api/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                }),
            }).catch((e) => {
                console.log(e)
            })

            return true
        }
    },
    secret: process.env.SECRET as string,
}

export default NextAuth(authOptions)