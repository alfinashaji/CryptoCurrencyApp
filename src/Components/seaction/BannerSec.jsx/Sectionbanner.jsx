import React, {useContext, useEffect, useState} from "react";
import {Grid, Stack, Typography, Paper, IconButton} from "@mui/material";

import {AppContext} from "../../../App";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import WhatshotIcon from "@mui/icons-material/Whatshot"; // Import the fire icon
import MediaQuery from "react-responsive";
import SearchButton from "../../common/Button/Searchbutton";

const Sectionbanner = () => {
  const {state, dispatch, mediaQuery} = useContext(AppContext);

  const top5Gainers = state?.data?.coins
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 5);

  const top5Losers = state.data?.coins
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    )
    .slice(0, 5);

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="auto"
        width="100%"
        sx={{height: "auto", background: state.theme.bgColor}}
      >
        <Stack
          direction={{xs: "column", sm: "column", md: "row", lg: "row"}}
          spacing={2}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            padding: "50px",
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          {mediaQuery && mediaQuery.mobile && <SearchButton />}
          <Paper
            sx={{
              height: "auto",
              flexGrow: 1,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: state.theme.bgColor,
              borderRadius: "10px",
              boxShadow: 3,
              color: state.theme.fontColor,
              border: `1px solid ${state.theme.borderColor}`,
            }}
          >
            <Typography variant="h6" gutterBottom>
              <IconButton>
                <WhatshotIcon sx={{fontSize: 30, color: "orange"}} />
              </IconButton>
              Trending
            </Typography>
          </Paper>
          {/* Top Gainers */}
          <Paper
            sx={{
              height: "auto",
              flexGrow: 1,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: state.theme.bgColor,
              borderRadius: "10px",
              boxShadow: 3,
              color: state.theme.fontColor,
              fontSize: "25px",
              rowGap: "5px",
              border: `1px solid ${state.theme.borderColor}`,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TrendingUpIcon sx={{fontSize: 30, color: "rgb(97, 136, 255)"}} />
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "rgb(97, 136, 255)",
                }}
              >
                Top Gainers
              </Typography>
            </Stack>
            {top5Gainers.map((coin) => (
              <div
                key={coin.id}
                style={{display: "flex", gap: "10px", alignItems: "center"}}
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  style={{
                    width: "8%",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <Typography sx={{fontSize: "10px"}}>
                  {coin.name} ({coin.symbol.toUpperCase()}):{" "}
                  <span style={{color: "#008000 "}}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </Typography>
              </div>
            ))}
          </Paper>

          {/* Top Losers */}
          <Paper
            sx={{
              height: "auto",
              flexGrow: 1,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: state.theme.bgColor,
              borderRadius: "10px",
              boxShadow: 3,
              color: state.theme.fontColor,
              border: `1px solid ${state.theme.borderColor}`,
              rowGap: "5px",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TrendingDownIcon sx={{fontSize: 30, color: "red"}} />
              <Typography sx={{color: "red", fontWeight: "bold"}}>
                Top Losers
              </Typography>
            </Stack>
            {top5Losers.map((coin) => (
              <div
                key={coin.id}
                style={{display: "flex", gap: "10px", alignItems: "center"}}
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  style={{
                    width: "8%",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <Typography sx={{fontSize: "10px"}}>
                  {coin.name} ({coin.symbol.toUpperCase()}):{" "}
                  <span style={{color: "#ff0000"}}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </Typography>
              </div>
            ))}
          </Paper>

          {/* Additional Info */}
        </Stack>
      </Grid>
    </div>
  );
};

export default Sectionbanner;
