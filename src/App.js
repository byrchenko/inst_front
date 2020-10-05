import React from 'react';
import BrowserRouter from "react-router-dom/modules/BrowserRouter";
import Route from "react-router/modules/Route";
import Feed from "./Feed";

function App() {
  return (
    <BrowserRouter>
      <Route path={"/feed"}>
        <Feed />
      </Route>
    </BrowserRouter>
  );
}

export default App;
