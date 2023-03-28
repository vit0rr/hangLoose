import styles from "@/styles/home.module.css";
import { GoOctoface } from "react-icons/go";
import { AiOutlineArrowRight } from "react-icons/ai";

import { GetServerSidePropsContext, NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getServerAuthSession } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to '/hang-loose' if the user is logged in.
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/hang-loose");
    }
  }, [status, router]);

  return (
    <main className={styles.main}>
      <div className={styles.buttonContainer}>
        <h1 className={styles.title}>Hangloose</h1>
        <button onClick={() => signIn("github")} className={styles.button}>
          Sign In{" "}
          <div style={{ marginLeft: "10px" }}>
            <GoOctoface />
          </div>
        </button>
        <span className={styles.sourceCode}>
          <a href="https://github.com/vit0rr/hangLoose" target="_blank">
            Source code{" "}
            <div style={{ marginLeft: "5px" }}>
              <AiOutlineArrowRight />
            </div>
          </a>
        </span>
      </div>
    </main>
  );
};

export default Home;
