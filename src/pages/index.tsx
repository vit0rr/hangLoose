import LoginButton from '@/components/LoginButton/LoginButton'
import { GetServerSidePropsContext, NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react'
import { getServerAuthSession } from './api/auth/[...nextauth]';

const Home: NextPage = () => {
  return (
    <main>
      <button onClick={() => signIn("github")}>loga ai fera</button>
    </main>
  )
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx)

  if(!session?.user) {
    return { props: {} }
  }

  return {
    redirect: {
      destination: '/hang-loose',
      permanent: false
    },
    props: {}
  }
}

export default Home;

