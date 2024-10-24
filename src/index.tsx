import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, App2} from './App';
import Layout from './page/Layout';

export const APP_NAME = "app-demo";
export const SESSION_STORAGE = "chatSessionId"

export enum BroadcastAction {
  NEW_SESSION = "newSession",
  CLEAR_SESSION = "clearSession",
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App2 />
    {/* <Layout /> */}
  </React.StrictMode>
);
