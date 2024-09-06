import React, {useContext, useRef, useState} from "react";
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

const SearchButton = () => {
  const {state, mediaQuery} = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // const inputRef = useRef();
  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredCoins = state.data?.coins
    ?.filter(
      (coin) =>
        coin.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        coin.symbol.toLowerCase().startsWith(searchValue.toLowerCase())
    )
    .slice(0, 13); // Limit the number of displayed results

  const boxStyles = {
    marginTop: "10px",
    padding: "10px",
    background: "#0D1421",
    border: "1px solid #2961B4",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    position: "absolute",
    top: mediaQuery && mediaQuery.mobile ? "140px" : "60px",
    right: mediaQuery && mediaQuery.mobile ? "5%" : "100px",
    zIndex: 10,
    maxHeight: "300px", // Limit height to avoid overflow
    overflowY: "auto", // Add scroll if needed
    width: mediaQuery && mediaQuery.mobile ? "90%" : "30%",
  };

  const inputStyles = {
    width: "100%",
    background: "#171b2e",
    borderRadius: "5px",
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
    <Box>
      <Grid container alignItems="center" paddingLeft="15px">
        <Grid item xs={12}>
          <Input
            sx={inputStyles}
            onClick={handleClick}
            readOnly
            placeholder="Type in here…"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon sx={{color: "#949191"}} />
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>

      {show && (
        <Box sx={boxStyles}>
          <Input
            sx={inputStyles}
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search coins…"
            autoFocus
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon sx={{color: "#949191"}} />
              </InputAdornment>
            }
          />

          {searchValue === "" ? (
            <Typography sx={{mt: 1, fontWeight: "bold"}}>
              Featured Coins
            </Typography>
          ) : (
            <Typography sx={{mt: 1, fontWeight: "bold"}}>
              Search Result
            </Typography>
          )}

          <Stack spacing={1.3} mt={1}>
            {filteredCoins?.length > 0 ? (
              filteredCoins.map((coin) => (
                <Box
                  key={coin.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Stack spacing={1.3} direction="row" sx={{width: "100%"}}>
                    <Stack spacing={1.3} direction="row" sx={{width: "60%"}}>
                      <Avatar
                        alt={coin.name}
                        src={coin.image}
                        sx={{
                          width: 20,
                          height: 20,
                          background: "white",
                          marginRight: "10px",
                        }}
                      />
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{fontWeight: "light"}}
                      >
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={1.3}
                      direction="row"
                      sx={{width: "40%"}}
                      justifyContent="flex-end"
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            coin.price_change_percentage_24h > 0
                              ? "#20D9AE"
                              : "#FF0000",
                        }}
                      >
                        {coin.price_change_percentage_24h}%
                      </Typography>
                      <Typography variant="body2" component="span">
                        #{coin.market_cap_rank}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No coins available</Typography>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SearchButton;
