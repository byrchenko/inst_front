import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Feed from "./Feed";

export const USER_ID = 1;

function App() {
  return (
    <BrowserRouter>
      <Route path={"/"} component={Feed} />
    </BrowserRouter>
  );
}

export default App;
