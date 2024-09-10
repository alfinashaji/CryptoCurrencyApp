import {Divider, Grid, Stack, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import Cardcoin from "../../common/card/coinCard/Cardcoin";
import {AppContext} from "../../../App";

const Secondhomesection = () => {
  const {state, mediaQuery} = useContext(AppContext);

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
          <Stack
            direction="row"
            style={{
              paddingLeft: "15px",
              fontSize: "x-large",
              paddingTop: "36px",
              gap: "10px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: state.theme.fontColor,
                fontSize: "25px",
              }}
            >
              Featured Coins
            </Typography>
            {mediaQuery && mediaQuery.mobile ? (
              ""
            ) : (
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  borderColor: state.theme.borderColor, // or any other color
                  background: state.theme.fontColor,
                  height: "1px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  width: "85%",
                  mt: 2.5,
                }}
              />
            )}
          </Stack>
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
