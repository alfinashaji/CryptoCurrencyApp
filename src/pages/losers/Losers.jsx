import React, {useContext} from "react";
import {AppContext} from "../../App";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Losers = () => {
  const {state} = useContext(AppContext);
  const coins = state?.data?.coins || [];

  // Compute top 5 losers
  const top5Losers = coins.sort(
    (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
  );

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "black", // Background color for the whole container
        padding: "20px", // Optional: Add padding to the container
      }}
    >
      <Box
        sx={{
          backgroundColor: "#333", // Darker background color for the content box
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          maxWidth: "600px",
          margin: "20px auto",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{marginBottom: "16px", color: "#fff"}} // White text color
        >
          Top 5 Losers
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: "bold", color: "black"}}>
                  Coin
                </TableCell>
                <TableCell
                  align="right"
                  sx={{fontWeight: "bold", color: "black"}}
                >
                  Change (%)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {top5Losers.map((coin) => (
                <TableRow key={coin.id}>
                  <TableCell component="th" scope="row" sx={{color: "black"}}>
                    {coin.name}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{color: "#f44336", fontWeight: "bold"}}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Losers;
