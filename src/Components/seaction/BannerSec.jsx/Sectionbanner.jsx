import React, {useContext} from "react";
import {Grid, Stack, Typography, Paper, IconButton} from "@mui/material";
import {AppContext} from "../../../App";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {Link} from "react-router-dom";
import SearchButton from "../../common/Button/Searchbutton";

// Helper function to get theme styles
const getThemeStyles = (theme) => ({
  backgroundColor: theme?.bgColor || "defaultBackground",
  fontColor: theme?.fontColor || "defaultFontColor",
  boxColor: theme?.boxColor || "defaultBoxColor",
});

const Sectionbanner = () => {
  const {state, mediaQuery} = useContext(AppContext);
  const themeStyles = getThemeStyles(state?.theme);

  const coins = state?.data?.coins || [];

  const top5Gainers = coins
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 5);

  const top5Losers = coins
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
        sx={{height: "auto", background: themeStyles.backgroundColor}}
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
              background: themeStyles.boxColor,
              borderRadius: "10px",
              boxShadow:
                "rgba(88, 102, 126, 0.08) 0px 4px 24px, rgba(88, 102, 126, 0.12) 0px 1px 2px",
              color: themeStyles.fontColor,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow:
                  "rgba(88, 102, 126, 0.16) 0px 6px 30px, rgba(88, 102, 126, 0.20) 0px 2px 4px",
              },
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
              background: themeStyles.boxColor,
              borderRadius: "10px",
              boxShadow:
                "rgba(88, 102, 126, 0.08) 0px 4px 24px, rgba(88, 102, 126, 0.12) 0px 1px 2px",
              color: themeStyles.fontColor,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow:
                  "rgba(88, 102, 126, 0.16) 0px 6px 30px, rgba(88, 102, 126, 0.20) 0px 2px 4px",
              },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TrendingUpIcon sx={{fontSize: 30, color: "rgb(97, 136, 255)"}} />
              <Typography sx={{fontWeight: "bold", color: "rgb(97, 136, 255)"}}>
                Top Gainers
              </Typography>
            </Stack>
            {top5Gainers.map((coin) => (
              <Link
                key={coin.id}
                to={`/coins/${coin.id}`}
                style={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow:
                      "rgba(88, 102, 126, 0.08) 0px 4px 24px, rgba(88, 102, 126, 0.12) 0px 1px 2px",
                    color: themeStyles.fontColor,
                    fontSize: "13px",
                    transition: "background 0.3s",
                    "&:hover": {
                      background: themeStyles.boxColor,
                      opacity: 0.8,
                    },
                  }}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    style={{
                      width: "35px",
                      borderRadius: "50%",
                      objectFit: "contain",
                      background: "grey",
                    }}
                  />
                  <Typography>
                    {coin.name} ({coin.symbol.toUpperCase()}):{" "}
                    <span style={{color: "#008000"}}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </Typography>
                </Stack>
              </Link>
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
              background: themeStyles.boxColor,
              borderRadius: "10px",
              boxShadow:
                "rgba(88, 102, 126, 0.08) 0px 4px 24px, rgba(88, 102, 126, 0.12) 0px 1px 2px",
              color: themeStyles.fontColor,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow:
                  "rgba(88, 102, 126, 0.16) 0px 6px 30px, rgba(88, 102, 126, 0.20) 0px 2px 4px",
              },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TrendingDownIcon sx={{fontSize: 30, color: "red"}} />
              <Typography sx={{color: "red", fontWeight: "bold"}}>
                Top Losers
              </Typography>
            </Stack>
            {top5Losers.map((coin) => (
              <Link
                key={coin.id}
                to={`/coins/${coin.id}`}
                style={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow:
                      "rgba(88, 102, 126, 0.08) 0px 4px 24px, rgba(88, 102, 126, 0.12) 0px 1px 2px",
                    color: themeStyles.fontColor,
                    fontSize: "13px",
                    transition: "background 0.3s",
                    "&:hover": {
                      background: themeStyles.boxColor,
                      opacity: 0.8,
                    },
                  }}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    style={{
                      width: "35px",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                  <Typography>
                    {coin.name} ({coin.symbol.toUpperCase()}):{" "}
                    <span style={{color: "#ff0000"}}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </Typography>
                </Stack>
              </Link>
            ))}
          </Paper>
        </Stack>
      </Grid>
    </div>
  );
};

export default Sectionbanner;
