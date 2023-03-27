import styles from '@/styles/hangloose.module.css'

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
    userUrl: string;
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
        <main className={styles.main}>
            <h1 className={styles.h1}>Hang Looses</h1>
            <ul className={styles.ul}>
                {hangLooses.map((u) => (
                    <li key={u.githubId} className={styles.li}>
                        <img src={u.avatar} className={styles.img} />
                        {
                            u.userUrl ? (
                                <span><a href={u.userUrl} target={"_blank"} className={styles.a}>{u.name} </a> 🤙</span>
                            ) : (
                                <span>{u.name} 🤙</span>
                            )
                        }
                    </li>
                ))}
            </ul>
            <button onClick={() => signOut()} className={styles.button}>Sign Out</button>
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
