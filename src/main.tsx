import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./Shared/Router/Router";

const container: HTMLElement | null = document.getElementById('root');
const root = createRoot(container!);

import { Provider } from 'react-redux'
import store from './Redux/Store/store';

root.render(
  <Provider store={store}>
  <React.Fragment>
    <BrowserRouter >
      <Routing/>
    </BrowserRouter>
  </React.Fragment>
  </Provider>
);
