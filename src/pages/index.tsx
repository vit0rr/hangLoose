import LoginButton from '@/components/LoginButton/LoginButton'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      {session && (
        <>
          <h1>Logged in as {session.user?.name}</h1>
        </>
      )}
      <LoginButton />
    </>
  )
}
