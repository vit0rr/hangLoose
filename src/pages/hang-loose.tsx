import styles from "@/styles/hangloose.module.css";

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

export default function HangLoose({
  hangLooses: hangLooses,
}: {
  hangLooses: HangLooseUser[];
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const tweetMessage = `Hey! I just signed up for HangLoose! It's a new way to connect with other developers. Check it out! https://hang-loose.vercel.app/ 🤙`;

  // Redirect to '/' if the user is not logged in.
  useEffect(() => {
    if (status === 'unauthenticated') {
        router.push('/');
    }
  }, [status, router]);

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>
        <a href="https://github.com/vit0rr/hangLoose" target="_blank">Hang Looses</a> 🤙
      </h1>
      <div className={styles.actionButtons}>
        <button onClick={() => signOut()} className={styles.button}>
          Sign Out
        </button>
        <a
          className={styles.twitterButton}
          href={`https://twitter.com/intent/tweet?text=${tweetMessage}`}
          target="_blank"
        >
          Tweet
        </a>
      </div>
      <div className={styles.flexContainer}>
        {hangLooses.map((u) => (
          <a
            key={u.githubId}
            href={u.userUrl}
            target="_blank"
            className={styles.user}
          >
            <div key={u.githubId}>
              <img src={u.avatar} className={styles.img} />
              {u.userUrl ? (
                <span className={styles.name}>{u.name} 🤙</span>
              ) : (
                <span className={styles.name}>{u.name} 🤙</span>
              )}
            </div>
          </a>
        ))}
      </div>
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
