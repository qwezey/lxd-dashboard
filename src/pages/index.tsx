import {FC} from 'react';
import {Authenticate} from '@/authenticate';

export default function Home(): ReturnType<FC> {
  return <Authenticate />;
}
