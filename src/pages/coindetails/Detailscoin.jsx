import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Header from "../../Components/common/header/Header";
import {
  Avatar,
  CircularProgress,
  Grid,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import Maingraph from "../../Components/common/Graph/Maingraph";
import moment from "moment/moment";
import {AppContext} from "../../App";
import MarqueewidjetDarkmode from "../../Components/common/marqueewidjet/marqueewidjetDark/MarqueewidjetDarkmode";
import MarqueewidjetLightMode from "../../Components/common/marqueewidjet/marqueewidjetLight/MarqueewidjetLightMode";
import Footer from "../../Components/common/footer/Footer";

const Detailscoin = () => {
  const {id} = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({prices: [], marketcap: [], volumes: []});
  const {state} = useContext(AppContext);

  const rootURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`${rootURL}/coins/${id}`, {
          headers: {"Access-Control-Allow-Origin": "*"},
        });
        setCoinData(response.data);
        // Log the entire response to check its structure
        console.log("Fetched coin data:", response.data);

        const chartData = await axios.get(
          `${rootURL}/coins/${id}/market_chart?vs_currency=inr&days=1`,
          {headers: {"Access-Control-Allow-Origin": "*"}}
        );
        chartData &&
          setData({
            ...data,
            prices: chartData?.data?.prices?.map((value) => value[1]),
            priceDate: chartData?.data?.prices?.map((value) =>
              moment(value[0]).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
            ),
            marketcap: chartData?.data?.market_caps?.map((value) => value[1]),
            marketcapDate: chartData?.data?.market_caps?.map((value) =>
              moment(value[0]).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
            ),
            volumes: chartData?.data?.total_volumes?.map((value) => value[1]),
            volumesDate: chartData?.data?.total_volumes?.map((value) =>
              moment(value[0]).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
            ),
          });

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch coin data. Please try again later.");
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id, rootURL]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
          backgroundColor: state.theme.bgColor,
        }}
      >
        <CircularProgress disableShrink />
      </div>
    );
  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
          backgroundColor: state.theme.bgColor,
        }}
      >
        <CircularProgress disableShrink />
      </div>
    );
  console.log(coinData);

  return (
    <div>
      {state && state.theme.mode === "dark" ? (
        <MarqueewidjetDarkmode />
      ) : (
        <MarqueewidjetLightMode />
      )}
      <Stack>
        <Grid container direction={{xs: "column", md: "row"}}>
          <Grid
            item
            xs={12} // Full width on extra-small screens
            sm={6} // Half width on small screens
            md={6} // One-third width on medium screens
            lg={4}
            sx={{
              height: "700px",
              padding: {xs: "19px", sm: "40px"},
              backgroundColor: state.theme.bgColor,
              color: state.theme.fontColor,
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              // Define styles specifically for medium and up sizes
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center">
                <Avatar
                  alt={coinData?.name}
                  src={coinData?.image?.small}
                  sx={{
                    width: 40,
                    height: 40,
                    color: state.theme.fontColor,
                    marginRight: "10px",
                  }}
                />
                <Typography variant="h6">{coinData?.name}</Typography>
              </Stack>
              <Typography
                variant="h6"
                sx={{fontSize: "30px", fontWeight: "600"}}
              >
                ₹ {coinData?.market_data?.current_price?.inr}
              </Typography>
              <Stack spacing={2}>
                <Grid>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Market Cap</Typography>
                    <Typography>
                      {coinData?.market_data?.market_cap?.inr}
                    </Typography>
                  </Stack>
                </Grid>
                <Slider
                  sx={{
                    border: "none",
                    // Border styling
                    color: "primary.main", // Main color for thumb and track
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#FFFFFF", // Custom color for the thumb
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#707070", // Custom color for the track
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#707070", // Custom color for the rail
                    },
                  }}
                  value={coinData?.market_data?.market_cap?.inr || 0}
                  aria-label="Market Cap"
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₹ ${value.toLocaleString()}`}
                  min={0}
                  max={coinData?.market_data?.market_cap?.inr || 1}
                />
                <Grid>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      color: state.theme.fontColor,
                    }}
                  >
                    <Typography>Volume</Typography>
                    <Typography>
                      {coinData?.market_data?.total_volume?.inr}
                    </Typography>
                  </Stack>
                </Grid>
                <Slider
                  sx={{
                    border: "none",
                    // Border styling
                    color: "primary.main", // Main color for thumb and track
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#FFFFFF", // Custom color for the thumb
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#707070", // Custom color for the track
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#707070", // Custom color for the rail
                    },
                  }}
                  value={coinData?.market_data?.total_volume?.inr || 0}
                  aria-label="Volume"
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₹ ${value.toLocaleString()}`}
                  min={0}
                  max={coinData?.market_data?.total_volume?.inr || 1}
                />
              </Stack>

              <Grid>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Twitter Followers</Typography>
                  <Typography>
                    {coinData?.community_data?.twitter_followers || "N/A"}
                  </Typography>
                </Stack>
              </Grid>
              <Grid>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Twitter Followers</Typography>
                  <Typography>
                    {coinData?.community_data?.telegram_channel_user_count ||
                      "N/A"}
                  </Typography>
                </Stack>
              </Grid>
              <Grid>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Watchlist Portfolio Users</Typography>
                  <Typography>
                    {coinData?.watchlist_portfolio_users || "N/A"}
                  </Typography>
                </Stack>
              </Grid>
              <Grid>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Downvote Percentage</Typography>
                  <Typography sx={{color: "green"}}>
                    {coinData?.sentiment_votes_down_percentage}%
                  </Typography>
                </Stack>
              </Grid>
              <Grid>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Upvote Percentage</Typography>
                  <Typography sx={{color: "red"}}>
                    {coinData?.sentiment_votes_up_percentage}%
                  </Typography>
                </Stack>
              </Grid>
            </Stack>
          </Grid>

          <Grid
            xs={12} // Full width on extra-small screens
            sm={12} // Half width on small screens
            md={6} // One-third width on medium screens
            lg={8}
            sx={{
              display: "flex",
              backgroundColor: state.theme.bgColor,
              flexWrap: "wrap",
              alignContent: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
              padding: {
                xs: "40px 16px", // for extra small screens
                sm: "40px 30px", // for small screens and up
              },
            }}
          >
            <Stack
              sx={{
                backgroundColor: state.theme.bgColor,
                width: "95%",
              }}
            >
              {data && <Maingraph data={data} />}
            </Stack>

            {/* Add relevant details content here */}
          </Grid>
        </Grid>
      </Stack>
      <Footer />
    </div>
  );
};

export default Detailscoin;
