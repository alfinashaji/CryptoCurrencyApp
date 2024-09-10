import React, {useContext, useEffect} from "react";
import Sectionbanner from "../../Components/seaction/BannerSec.jsx/Sectionbanner";
import Secondhomesection from "../../Components/seaction/SecondSec.jsx/Secondhomesection";
import Bannerthirdsec from "../../Components/seaction/ThirdSection/Bannerthirdsec";
import Allbutton from "../../Components/common/Button/Allbutton";
import {Table, Typography} from "@mui/material";
import {AppContext} from "../../App";
import axios from "axios";
import Footer from "../../Components/common/footer/Footer";

const Home = () => {
  const rootURL = process.env.REACT_APP_API_URL;
  const {state, dispatch} = useContext(AppContext);

  useEffect(() => {
    axios
      .get(
        `${rootURL}/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=100&page=1&sparkline=false`,
        {headers: {"Access-Control-Allow-Origin": "*"}}
      )
      .then((data) => {
        dispatch({type: "FETCH_COINS_REQUEST", payload: data?.data});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      <Sectionbanner />
      <Secondhomesection />

      <Bannerthirdsec />
      <Footer />
    </div>
  );
};

export default Home;
