import React, {useContext, useRef, useState, useEffect} from "react";
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
import {Link} from "react-router-dom";

const SearchButton = () => {
  const {state, mediaQuery} = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const boxRef = useRef(null);

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
    background: state.theme.boxColor,
    border: "1px solid #2961B4",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    position: "absolute",
    top: mediaQuery && mediaQuery.mobile ? "140px" : "60px",
    right: mediaQuery && mediaQuery.mobile ? "5%" : "100px",
    zIndex: 10,
    maxHeight: "300px", // Limit height to avoid overflow
    overflowY: "auto", // Add scroll if needed
    width: mediaQuery && mediaQuery.mobile ? "95%" : "30%",
    scrollbarWidth: "none",
  };

  const height = mediaQuery && mediaQuery.mobile ? "55px" : "40px";

  const inputStyles = {
    paddingLeft: "20px",
    paddingRight: "20px",
    width: "100%",
    background: state.theme.boxColor,
    borderRadius: "5px",
    height: height,
    color: state.theme.fontColor,

    input: {
      "&::placeholder": {
        opacity: 0.6,
        color: state.theme.fontColor,

        fontSize: "16px",
        paddingX: 1.5,
      },
    },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box>
      <Grid container alignItems="center">
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
        <Box sx={boxStyles} ref={boxRef}>
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
                <Link
                  to={`/coins/${coin.id}`}
                  key={coin.id}
                  style={{textDecoration: "none", color: state.theme.fontColor}}
                >
                  <Box
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
                </Link>
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
