import React, {useContext} from "react";
import Tablesection from "../../common/Table/Tablesection";
import {AppContext} from "../../../App";
import {Grid, Stack, Typography} from "@mui/material";
import Tablesearchbtn from "../../common/Button/Tablesearchbtn";

const Bannerthirdsec = () => {
  const {state} = useContext(AppContext);

  return (
    <Grid
      container
      sx={{
        background: state.theme.bgColor,
        paddingLeft: "30px",
        paddingRight: "30px",
        boxSizing: "border-box",
      }}
    >
      <Stack sx={{mt: 4, width: {xs: "100%", sm: "auto"}}}>
        <Typography
          sx={{
            color: state.theme.fontColor,
            fontSize: "25px",
            paddingLeft: "20px",
          }}
        >
          All Coins
        </Typography>

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
