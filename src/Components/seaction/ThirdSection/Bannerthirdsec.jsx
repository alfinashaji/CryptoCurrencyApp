import React, {useContext} from "react";
import Tablesection from "../../common/Table/Tablesection";
import {AppContext} from "../../../App";
import {Divider, Grid, Stack, Typography} from "@mui/material";
import Tablesearchbtn from "../../common/Button/Tablesearchbtn";

const Bannerthirdsec = () => {
  const {state, mediaQuery} = useContext(AppContext);

  return (
    <Grid
      container
      sx={{
        background: state.theme.bgColor,
        paddingLeft: {xs: "6px", sm: "30px"},
        paddingRight: {xs: "14px", sm: "30px"},
        boxSizing: "border-box",
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
          All Coins
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
              width: "91%",
              mt: 2.5,
            }}
          />
        )}
      </Stack>
      <Stack sx={{mt: 4, width: {xs: "100%", sm: "auto"}}}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 2,
            width: {xs: "100%", sm: "auto"}, // Increase width on small screens
          }}
        >
          <Tablesearchbtn
            sx={{
              width: {xs: "100%", sm: "auto"}, // Ensure it takes full width on small screens
            }}
          />
        </Stack>
      </Stack>
      <Tablesection coins={state && state.data.coins} />
    </Grid>
  );
};

export default Bannerthirdsec;
