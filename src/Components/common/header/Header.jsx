import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useContext} from "react";
import {AppContext} from "../../../App";
import SearchButton from "../Button/Searchbutton";
import Allbutton from "../Button/Allbutton";
import logoImage from "../../../assets/images/react-logo-removebg-preview.png";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function Header(props) {
  const {window} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {state} = useContext(AppContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: "center"}}>
      <Typography variant="h6" sx={{my: 2}}>
        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <img src={logoImage} alt="" style={{height: "35px"}} />
          <div>Coin Wave</div>
        </div>
      </Typography>

      <Divider />
      <Typography>All coins</Typography>
      <Typography>Trending</Typography>
      <Typography>Gainers</Typography>
      <Typography>Losers</Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{textAlign: "center"}}>
              <ListItemText />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline />
      <AppBar component="nav" sx={{background: state.theme.bgColor}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: "none"}}}
          >
            <MenuIcon />
          </IconButton>

          <Grid
            sx={{
              width: "50%",
              display: {xs: "none", sm: "block"},
              paddingLeft: "26px",
            }}
          >
            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
              <img src={logoImage} alt="" style={{height: "35px"}} />
              <div>Coin Wave</div>
            </div>
          </Grid>

          <Box
            sx={{
              display: {xs: "none", sm: "block"},
              width: "50%",
              paddingRight: "5px",
            }}
          >
            <Grid
              sx={{
                width: "100%",
                height: "50px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                color: state.theme.fontColor,
              }}
            >
              <Typography>All coins</Typography>
              <Typography>Trending</Typography>
              <Typography>Gainers</Typography>
              <Typography>Losers</Typography>
              <SearchButton />
              <Allbutton />
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: "block", sm: "none"},
            "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
        {/* Main content of the page */}
      </Box>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
