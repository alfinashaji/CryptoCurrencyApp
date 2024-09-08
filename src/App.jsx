import React, {createContext, useReducer} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Detailscoin from "./pages/coindetails/Detailscoin";
import Gainers from "./pages/gainers/Gainers";
import Losers from "./pages/losers/Losers";

import {initialValue, appReducer} from "./reducer/appReducer";
import Header from "./Components/common/header/Header";
import {useMediaQuery} from "react-responsive";
import AllCoins from "./pages/allcoins/AllCoins";

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(appReducer, initialValue);
  const isMobileScreen = useMediaQuery({query: "(max-width: 600px)"});

  return (
    <AppContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
        mediaQuery: {mobile: isMobileScreen},
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<Detailscoin />} />
        <Route path="/gainers" element={<Gainers />} />
        <Route path="/losers" element={<Losers />} />
        <Route path="/allcoins" element={<AllCoins />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
