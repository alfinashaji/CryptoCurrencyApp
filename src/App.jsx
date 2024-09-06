import {createContext, useReducer} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Detailscoin from "./pages/coindetails/Detailscoin";
import {initialValue, appReducer} from "./reducer/appReducer";
import Header from "./Components/common/header/Header";
import {useMediaQuery} from "react-responsive";

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
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
