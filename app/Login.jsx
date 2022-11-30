'use client';

import { useSession, signIn, signOut } from "next-auth/react"
export default function Login() {
  const { data: session } = useSession();
  if (session) {
  
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Logga ut</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Logga in</button>
    </>
  )
}