import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }

    return (
        <>
            <span style={{ fontSize:"40px" }}>🤙</span> <br />
            <button onClick={() => signIn("github")}>Sign in</button>
        </>
    )
}