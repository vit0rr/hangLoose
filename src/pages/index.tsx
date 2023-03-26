import LoginButton from '@/components/LoginButton/LoginButton'
import { GetServerSidePropsContext, NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getServerAuthSession } from './api/auth/[...nextauth]';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to '/hang-loose' if the user is logged in.
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/hang-loose');
    }
  }, [status, router]);

  return (
    <main>
      <button onClick={() => signIn("github")}>loga ai fera</button>
    </main>
  )
};

export default Home;

