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

const Gainers = () => {
  const {state} = useContext(AppContext);
  const coins = state?.data?.coins || [];

  // Compute top 5 gainers
  const top5Gainers = coins.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
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
        sx={{marginBottom: "16px", color: "#333"}}
      >
        Top 5 Gainers
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: "bold"}}>Coin</TableCell>
              <TableCell align="right" sx={{fontWeight: "bold"}}>
                Change (%)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top5Gainers.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell component="th" scope="row">
                  {coin.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{color: "#4caf50", fontWeight: "bold"}}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Gainers;
