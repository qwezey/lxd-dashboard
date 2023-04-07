import {FC} from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';

export default function Home(): ReturnType<FC> {
  const {data: session} = useSession();
  if (session) {
    return (
      <>
        Signed in as {JSON.stringify(session.user)} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
