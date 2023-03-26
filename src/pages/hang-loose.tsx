import UserModel from "@/models/UserModel";
import { GetServerSidePropsContext } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connectMongo } from "../../middleware/mongodb";

interface HangLooseUser {
    _id: string;
    githubId: string;
    name: string;
    avatar: string;
    hasHangloose: boolean;
}

export default function HangLoose({ hangLooses: hangLooses }: { hangLooses: HangLooseUser[] }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect to '/' if the user is not logged in.
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    return (
        <main>
            <h1>Hang Looses</h1>
            <ul>
                {hangLooses.map((u) => (
                    <li key={u.githubId} style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={u.avatar} style={{ width: '48px', height: '48px' }} />
                        <span>{u.name} 🤙</span>
                    </li>
                ))}
            </ul>
            <button onClick={() => signOut()}>Meter o pé</button>
        </main>
    );
}

export const getServerSideProps = async (_: GetServerSidePropsContext) => {
    await connectMongo();

    try {
        // @ts-ignore
        const hangLooses: HangLooseUser[] = (
            await UserModel.find({ hasHangloose: true }).lean()
        ).map((user) => {
            return {
                ...user,
                _id: user._id.toString(),
            };
        });

        return { props: { hangLooses } };

    } catch (error) {
        console.log(error);
        return {
            props: { hangLooses: [] },
        };
    }
};
