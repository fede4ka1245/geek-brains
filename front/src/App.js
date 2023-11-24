import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "./routes";
import Main from "./pages/main/Main";
import Header from "./components/header/Header";
import React from "react";
import {Grid} from "@mui/material";
import {Provider} from "react-redux";
import store from "./store";
import Summary from "./pages/summary/Summary";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Grid
            width={'var(--content-width)'}
            maxWidth={'100%'}
            ml={'auto'}
            mr={'auto'}
            p={'var(--space-md)'}
          >
            <Routes>
              <Route path={routes.main} element={<Main />}/>
              <Route path={routes.summary + '/:id'} element={<Summary />} />
            </Routes>
          </Grid>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
