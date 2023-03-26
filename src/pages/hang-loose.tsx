import UserModel from "@/models/UserModel";
import { getGithubId } from "@/utils/getGithubId";
import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { connectMongo } from "../../middleware/mongodb";
import { getServerAuthSession } from "./api/auth/[...nextauth]";

interface HangLooseUser {
    _id: string;
    githubId: string;
    name: string;
    avatar: string;
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
    await connectMongo();
    const session = await getServerAuthSession(ctx);

    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
            props: {},
        };
    }

    const githubId = getGithubId(session.user.image);
    try {
        const user = await UserModel.findOne({ githubId });
        if (!user) {
            console.log("User not found");
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
                props: {},
            };
        }

        if (!user.hasHangloose) {
            await UserModel.updateOne({ githubId }, { $set: { hasHangloose: true } });
        }

        const hangLooses = (await UserModel.find({ hasHangloose: true }).lean()).map((user) => {
            return {
                ...user,
                _id: user._id.toString(),
            };
        });

        return { props: { hangLooses } };
    } catch (error) {
        console.log(error);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
            props: {},
        };
    }
}