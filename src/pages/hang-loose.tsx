import UserModel from "@/models/UserModel";
import { getGithubId } from "@/utils/getGithubId";
import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { getServerAuthSession } from "./api/auth/[...nextauth]";

interface HangLooseUser {
    _id: string;
    githubId: string;
    name: string;
    avatar: string;
    email: string;
    hasHangloose: boolean;
}

export default function HangLoose({ hangLooses: hangLooses }: { hangLooses: HangLooseUser[] }) {
    return (
        <main>
            <h1>Hang Looses</h1>
            <ul>
                {hangLooses.map((u) => <li key={u.githubId} style={{ display: 'flex', alignItems: "center" }}>
                    <img src={u.avatar} style={{ width: "48px", height: "48px" }} />
                    <span>{u.name} 🤙</span>
                </li>)}
            </ul>
            <button onClick={() => signOut()}>Meter o pé</button>
        </main>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx)
    console.log("session", session)
    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
            props: {}
        }
    }

    const githubId = getGithubId(session.user.image)
    console.log("githubId", githubId)
    try {
        console.log("before find")
        await UserModel.findOneAndUpdate({ githubId }, { $set: { hasHangloose: true } })

        console.log("after find")

        const hangLooses: HangLooseUser[] = await UserModel.find({ hasHangloose: true }).lean()
        console.log("hangLooses", hangLooses)

        return { props: { hangLooses } }
    } catch (error) {
        console.log(error)
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
            props: {}
        }
    }
}