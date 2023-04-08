import {createContext} from './context';
import {appRouter} from './routers/_app';
import {applyWSSHandler} from '@trpc/server/adapters/ws';
import ws from 'ws';

const wss = new ws.Server({
  port: 3001,
});
const handler = applyWSSHandler({wss, router: appRouter, createContext});
console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});
