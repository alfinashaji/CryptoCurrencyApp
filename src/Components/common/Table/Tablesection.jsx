import React, {useContext, useState, useEffect} from "react";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Smallgraph from "../Graph/smallGraph";
import {Avatar, Button, Stack, Typography} from "@mui/material";
import {AppContext} from "../../../App";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import axios from "axios";

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

// Styled TableRow with border bottom
const StyledTableRow = styled(TableRow)(({theme}) => ({
  backgroundColor: theme.palette.action.hover,
  borderBottom: `1px solid ${theme.palette.divider}`, // Border bottom for each row
}));

const Tablesection = () => {
  const {state} = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [graphData, setGraphData] = useState({});
  const rowsPerPage = 10;

  // Fetch the graph data for a specific coin
  const fetchGraphData = async (coinId) => {
    const rootURL = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(
        `${rootURL}/coins/${coinId}/market_chart?vs_currency=usd&days=1`
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
  };

  // Compute the rows to display based on the current page
  const paginatedCoins =
    state.searchValue !== ""
      ? state.data.coins
      : state.data.coins.slice(
          currentPage * rowsPerPage,
          (currentPage + 1) * rowsPerPage
        );

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
  console.log(currentPage, state.data.coins.length / 10 - 1);
  return (
    <div style={{maxWidth: "100%", width: "100%", overflowX: "auto"}}>
      <TableContainer
        component={Paper}
        sx={{
          background: state.theme.bgColor, // Background color for the entire table container
          padding: "20px", // Add padding for better spacing
        }}
      >
        <Table
          aria-label="customized table"
          sx={{
            background: state.theme.bgColor,
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                background: state.theme.bgColor,
                // borderBottom: `2px solid ${state.theme.borderColor}`,
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
              <StyledTableCell
                align="left"
                style={{
                  color: "#20D9AE", // Placeholder for positive change
                }}
              >
                Rank
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{color: state.theme.fontColor}}
              >
                Price
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{color: state.theme.fontColor}}
              >
                Graph
              </StyledTableCell>
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
                    <StyledTableCell
                      style={{
                        color: state.theme.fontColor,
                      }}
                    >
                      <Stack direction={"row"} spacing={5}>
                        <Avatar
                          alt={coinx.name}
                          src={coinx.image}
                          sx={{width: 20, height: 20, background: "white"}}
                        />
                        <Typography>{coinx.name}</Typography>
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
                          coinx.price_change_percentage_24h > 0
                            ? "#20D9AE"
                            : "#FF0000",
                      }}
                    >
                      {coinx.price_change_percentage_24h}%
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        color: state.theme.fontColor,
                      }}
                    >
                      {coinx.market_cap_rank}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{color: state.theme.fontColor}}
                    >
                      ${coinx.current_price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* Render Smallgraph with updated data */}
                      <Smallgraph
                        data={graphData[coinx.id]}
                        title={coinx.name}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button
            onClick={handlePreviousPage}
            variant="outlined"
            disabled={currentPage <= 0 ? true : false}
          >
            <ArrowBackIosNewOutlinedIcon />
          </Button>

          <Button
            onClick={handleNextPage}
            variant="outlined"
            disabled={
              currentPage < state.data.coins.length / 10 - 1 ? false : true
            }
          >
            <ArrowForwardIosOutlinedIcon />
          </Button>
        </div>
      </TableContainer>
    </div>
  );
};

export default Tablesection;
