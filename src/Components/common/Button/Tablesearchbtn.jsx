import React, {useContext, useState} from "react";
import {
  Grid,
  Input,
  InputAdornment,
  Box,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {AppContext} from "../../../App";
import {setSearchValue} from "../../../App"; // Adjust the import path as needed

const Tablesearchbtn = () => {
  const {state, dispatch} = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValueState] = useState("");

  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };

  const handleInputChange = (event) => {
    dispatch({type: "SEARCH_VALUE", payload: event.target.value}); // Dispatch search value to context
  };

  const filteredCoins = state.data?.coins
    ?.filter(
      (coin) =>
        coin.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        coin.symbol.toLowerCase().startsWith(searchValue.toLowerCase())
    )
    .slice(0, 13); // Limit the number of displayed results

  const inputStyles = {
    width: "100%",
    background: "#171b2e",
    borderRadius: "5px",
    color: "white",
    paddingLeft: "20px",
    height: "40px",
    input: {
      "&::placeholder": {
        opacity: 0.6,
        color: "#ffffff",
        fontSize: "13px",
        paddingX: 1.5,
      },
    },
  };

  return (
    <Box position="relative" sx={{width: "100%"}}>
      <Grid
        container
        alignItems="center"
        paddingLeft="15px"
        sx={{width: "100%"}}
      >
        <Grid item xs={12}>
          <Input
            sx={inputStyles}
            onClick={handleClick}
            onChange={handleInputChange}
            placeholder="Type in here…"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon sx={{color: "#949191"}} />
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tablesearchbtn;
