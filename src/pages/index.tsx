import {FC, useState} from 'react';
import {trpc} from '@/ui/trpc';
import Typography from '@mui/material/Typography';
import {useSession, signOut} from 'next-auth/react';
import Button from '@mui/material/Button';

export default function Home(): ReturnType<FC> {
  const [random, setRandom] = useState(0);
  const session = useSession();
  const {data} = trpc.healthcheck.useQuery();
  trpc.randomNumber.useSubscription(undefined, {
    onData(data) {
      setRandom(data);
    },
  });
  if (data)
    return (
      <>
        <Typography>
          we good {JSON.stringify(session)} {random}
        </Typography>
        <Button onClick={() => signOut()}>sign out</Button>
      </>
    );
  return <Typography>we not good</Typography>;
}
