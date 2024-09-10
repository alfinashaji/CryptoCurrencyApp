import {
  Container,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, {useContext} from "react";
import logoImages from "../../../assets/images/react-logo-removebg-preview.png";
import {AppContext} from "../../../App";

const Footer = () => {
  const {state} = useContext(AppContext);
  return (
    <Container maxWidth={true} disableGutters>
      <Stack
        sx={{
          height: "auto",
          width: "100%",
          background: state.theme.bgColor,
          color: "state.theme.fontColor",

          boxSizing: "border-box",
          paddingTop: "30px",
          paddingBottom: "30px",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={3} sx={{display: "contents"}}>
            <Stack>
              <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                <img src={logoImages} alt="" style={{height: "35px"}} />
                <div style={{color: state.theme.fontColor}}>Coin Wave</div>
              </div>
            </Stack>
          </Grid>
        </Grid>
        <Typography
          sx={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
            color: state.theme.fontColor,
          }}
        >
          © {new Date().getFullYear()} Coin Wave. All rights reserved.
        </Typography>
      </Stack>
    </Container>
  );
};

export default Footer;
