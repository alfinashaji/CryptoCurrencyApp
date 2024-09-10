import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Box, Grid, Rating, Stack, Typography, Avatar} from "@mui/material";
import Allgraph from "../../Graph/Allgraph";
import {AppContext} from "../../../../App";
import {Link} from "react-router-dom";

const Cardcoin = ({coin}) => {
  const rootURL = process.env.REACT_APP_API_URL;
  const {state} = useContext(AppContext);
  const [data, setData] = useState({prices: [], marketcap: [], volumes: []});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${rootURL}/coins/${coin.id}/market_chart?vs_currency=usd&days=1`,
        {headers: {"Access-Control-Allow-Origin": "*"}}
      );
      response &&
        setData({
          ...data,
          prices: response?.data?.prices?.map((value) => value[1]),
          marketcap: response?.data?.market_caps?.map((value) => value[1]),
          volumes: response?.data?.total_volumes?.map((value) => value[1]),
        });
    };

    fetchData();
  }, [coin.id, rootURL]);

  return (
    <Box
      sx={{
        background: state.theme.boxColor,
        borderRadius: "10px",
        border: `1px solid ${state.theme.borderColor}`,
        flexGrow: "1",
        boxShadow:
          "rgba(88, 102, 126, 0.08) 0px 4px 24px, rgba(88, 102, 126, 0.12) 0px 1px 2px",
      }}
    >
      <Link
        to={`/coins/${coin.id}`}
        style={{textDecoration: "none"}} // Remove underline here
      >
        <Stack
          spacing={{xs: 1, sm: 2}}
          direction="row"
          useFlexGap
          boxSizing="border-box"
          paddingLeft="10px"
          borderBottom={`2px solid ${state.theme.borderColor}`}
          display="flex"
          alignItems="center"
          p="10px"
        >
          <Avatar
            alt={coin.name}
            src={coin.image}
            sx={{width: 20, height: 20, background: "white"}}
          />
          <Stack flexWrap="wrap">
            <Typography
              style={{color: state.theme.fontColor, fontSize: "10px"}}
            >
              {coin.name}
            </Typography>
            <Typography style={{color: state.theme.fontColor}}>
              {coin.current_price}
            </Typography>
          </Stack>
          <Rating
            name="read-only"
            value={5}
            readOnly
            style={{fontSize: "17px"}} // Adjust the font size as needed
          />
        </Stack>
        <Stack
          spacing={{xs: 1, sm: 2}}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          padding="20px"
          boxSizing="border-box"
        >
          <Allgraph data={data} title={coin.name} />
        </Stack>
        <Stack
          spacing={{xs: 1, sm: 2}}
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap"
          padding="20px"
          boxSizing="border-box"
        >
          <Typography
            variant="subtitle1"
            component="h5"
            style={{color: state.theme.fontColor}}
          >
            Votes
          </Typography>
          <Typography
            variant="subtitle2"
            component="h5"
            style={{color: state.theme.fontColor}}
          >
            12345
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
};

export default Cardcoin;
