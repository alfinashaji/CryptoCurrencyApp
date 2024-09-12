import React, {useContext, useState, useCallback} from "react";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Avatar, Button, Divider, Stack, Typography} from "@mui/material";
import {AppContext} from "../../App";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import axios from "axios";
import debounce from "lodash.debounce";
import {Link} from "react-router-dom";
import Footer from "../../Components/common/footer/Footer";

// Styled TableCell for header and body
const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.text.primary,
    paddingLeft: "50px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "none",
    color: theme.palette.text.secondary,
    paddingLeft: "50px",
  },
}));

// Enhanced StyledTableRow with hover effects
const StyledTableRow = styled(TableRow)(({theme}) => ({
  backgroundColor: theme.palette.action.hover,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.selected, // Change background color on hover
    transform: "scale(1.02)", // Slightly scale up the row
    boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.2)`, // Add a shadow effect
    cursor: "pointer", // Change cursor to pointer on hover
  },
}));

// Custom styled button
const CustomButton = styled(Button)(({theme, disabled}) => ({
  borderColor: disabled ? "white" : "default",
  color: disabled ? "white" : "default",
  "&.Mui-disabled": {
    borderColor: "grey",
    color: "grey",
    opacity: 1,
  },
}));

const Losers = () => {
  const {state, mediaQuery} = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [graphData, setGraphData] = useState({});
  const rowsPerPage = 10;

  // Fetch the graph data for a specific coin
  const fetchGraphData = debounce(async (coinId) => {
    const rootURL = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(
        `${rootURL}/coins/${coinId}/market_chart?vs_currency=usd&days=1`,
        {headers: {"Access-Control-Allow-Origin": "*"}}
      );
      setGraphData((prevData) => ({
        ...prevData,
        [coinId]: {
          prices: response?.data?.prices?.map((value) => value[1]),
          marketcap: response?.data?.market_caps?.map((value) => value[1]),
          volumes: response?.data?.total_volumes?.map((value) => value[1]),
        },
      }));
    } catch (error) {
      console.error("Error fetching graph data", error);
    }
  }, 500); // Debounce interval

  // Compute the rows to display based on the current page
  const paginatedCoins =
    state.searchValue !== ""
      ? state.data.coins
      : state.data.coins
          .sort(
            (a, b) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          ) // Sort by ascending to show biggest losers
          .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const handleNextPage = () => {
    if ((currentPage + 1) * rowsPerPage < state.data.coins.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isLastPage = (currentPage + 1) * rowsPerPage >= state.data.coins.length;
  const isFirstPage = currentPage === 0;

  return (
    <div
      style={{
        maxWidth: "100%",
        width: "100%",
        overflowX: "auto",
        background: state.theme.bgColor,
        color: state.theme.fontColor,
      }}
    >
      <Stack
        direction="row"
        style={{
          paddingLeft: {xs: "19px", sm: "62px"},
          paddingRight: {xs: "19px", sm: "62px"},
          fontSize: "x-large",
          paddingTop: "36px",
          gap: "10px",
        }}
      >
        <Typography
          sx={{
            color: state.theme.fontColor,
            fontSize: "25px",
          }}
        >
          Losers
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
      <TableContainer
        component={Paper}
        sx={{
          background: state.theme.bgColor,
          padding: {xs: "19px", sm: "50px"},
        }}
      >
        <Table
          aria-label="customized table"
          sx={{background: state.theme.bgColor}}
        >
          <TableHead>
            <TableRow
              sx={{
                background: state.theme.bgColor,
              }}
            >
              <StyledTableCell style={{color: state.theme.fontColor}}>
                Coin
              </StyledTableCell>
              <StyledTableCell style={{color: state.theme.fontColor}}>
                Market Cap
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{color: state.theme.fontColor}}
              >
                24h
              </StyledTableCell>
              <StyledTableCell align="left" style={{color: "#20D9AE"}}>
                Rank
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{color: state.theme.fontColor}}
              >
                Price
              </StyledTableCell>
              <StyledTableCell align="center">Graph</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state &&
              state.data.coins &&
              paginatedCoins
                .filter((val) =>
                  val.name
                    .toLowerCase()
                    .includes(state?.searchValue.toLowerCase())
                )
                .map((coinx) => (
                  <StyledTableRow
                    key={coinx.id}
                    style={{
                      borderBottom: `2px solid ${state.theme.borderColor}`,
                    }}
                    onMouseEnter={() => fetchGraphData(coinx.id)}
                  >
                    <StyledTableCell style={{color: state.theme.fontColor}}>
                      <Stack direction={"row"} spacing={5}>
                        <Avatar
                          alt={coinx.name}
                          src={coinx.image}
                          sx={{width: 20, height: 20, background: "white"}}
                        />
                        <Typography>
                          <Link
                            to={`/coins/${coinx.id}`}
                            style={{color: "inherit", textDecoration: "none"}}
                          >
                            {coinx.name}
                          </Link>
                        </Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{color: state.theme.fontColor}}
                    >
                      ${coinx.market_cap}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{
                        color:
                          coinx.price_change_percentage_24h < 0
                            ? "#FF0000"
                            : "#20D9AE",
                      }}
                    >
                      {coinx.price_change_percentage_24h}%
                    </StyledTableCell>
                    <StyledTableCell style={{color: state.theme.fontColor}}>
                      {coinx.market_cap_rank}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{color: state.theme.fontColor}}
                    >
                      ${coinx.current_price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* <Smallgraph
                        data={graphData[coinx.id]}
                        title={coinx.name}
                      /> */}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
          background: state.theme.bgColor,
        }}
      >
        <CustomButton
          onClick={handlePreviousPage}
          variant="outlined"
          disabled={isFirstPage}
        >
          <ArrowBackIosNewOutlinedIcon />
        </CustomButton>

        <CustomButton
          onClick={handleNextPage}
          variant="outlined"
          disabled={isLastPage}
        >
          <ArrowForwardIosOutlinedIcon />
        </CustomButton>
      </div>
      <Footer />
    </div>
  );
};

export default Losers;
