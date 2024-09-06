import {Grid, Stack, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import Cardcoin from "../../common/card/coinCard/Cardcoin";
import {AppContext} from "../../../App";

const Secondhomesection = () => {
  const {state} = useContext(AppContext);

  return (
    <Grid>
      <Stack
        sx={{
          width: "100%",
          background: state.theme.bgColor,
          paddingRight: "50px",
          paddingLeft: "50px",
          boxSizing: "border-box",
          height: "auto",
        }}
      >
        <Grid
          container
          sx={{
            height: "auto",
            background: state.theme.bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "30px",
          }}
        >
          <Stack>
            <Typography sx={{color: state.theme.fontColor, fontSize: "25px"}}>
              Featured Coins
            </Typography>
          </Stack>
          {/* <Stack sx={{width: "80%", display: "flex"}}>
            <hr
              style={{
                width: "100%",
                borderBottom: `2px solid ${state.theme.borderColor}`,
              }}
            />
          </Stack> */}
        </Grid>
        <Stack
          container
          direction={{xs: "column", sm: "column", md: "row", lg: "row"}}
          sx={{
            background: state.theme.bgColor,
            height: "auto",
            marginTop: "0",
            width: "100%",
          }}
          spacing={2}
        >
          {state &&
            state?.data?.coins
              ?.slice(0, 4)
              .map((value, index) => <Cardcoin coin={value} key={index} />)}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default Secondhomesection;
