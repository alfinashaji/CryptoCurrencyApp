import {Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useContext} from "react";
import ReactApexChart from "react-apexcharts";
import {AppContext} from "../../../App";

const Maingraph = ({data}) => {
  const {state} = useContext(AppContext);
  const [graphToggle, setGraphToggle] = React.useState("price");

  const graphHandleChange = (event, dataToggle) => {
    setGraphToggle(dataToggle);
  };
  console.log(data);

  const CustomToggleButton = styled(ToggleButton)(({theme}) => ({
    width: "70%",
    paddingLeft: "20px",
    border: "none",
    background: state.theme.buttonColor, // Permanent background color
    color: "white",
    "&.Mui-selected": {
      backgroundColor: state.theme.buttonSelected, // Background color when selected
      color: "white",
    },
    "&:hover": {
      backgroundColor: state.theme.buttonSelected, // Background color on hover
      color: "white",
    },
  }));

  const options = {
    series: [
      {
        name:
          graphToggle === "price"
            ? "Price"
            : graphToggle === "volume"
            ? "Volume"
            : graphToggle === "marketcap" && "MarketCap",
        data:
          graphToggle === "price"
            ? data && data.prices
            : graphToggle === "volume"
            ? data && data.volumes
            : graphToggle === "marketcap" && data && data.marketcap,
      },
    ],

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 70, 100],
        //colors: ["#0D2A2D"], // Change the gradient colors
      },
      colors: ["#4CAF50"], // Change the fill color
    },
    stroke: {
      curve: "smooth",
      colors: ["#15B57A"], // Change the border color
      width: 2, // Change the border width
    },
    chart: {
      type: "area",
      height: "100%", // Ensure the chart takes 100% of the container height
      toolbar: {
        show: false, // remove toolbar
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      categories:
        graphToggle === "price"
          ? data && data.priceDate
          : graphToggle === "volume"
          ? data && data.volumesDate
          : graphToggle === "marketcap" && data && data.priceDate,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return Math.round(value);
        },
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  // Set a specific height for the chart container
  const chartContainerStyle = {
    width: "100%",
    height: "400px", // Adjust the height as needed
  };

  return (
    <div>
      <Stack
        sx={{
          boxSizing: "border-box",
          backgroundColor: "state.theme.bgColor",
          paddingBottom: "30px",
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={graphToggle}
          exclusive
          onChange={graphHandleChange}
          aria-label="Platform"
          sx={{
            // padding: "10px",
            background: state.theme.buttonColor,
            width: "50%",
            borderRadius: "10px",
          }}
        >
          <CustomToggleButton value="price">Price</CustomToggleButton>
          <CustomToggleButton value="volume">Volume</CustomToggleButton>
          <CustomToggleButton value="marketcap">MarketCap</CustomToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack sx={{width: "100%", height: "400px"}}>
        {" "}
        {/* Set the height here */}
        <div id="chart" style={chartContainerStyle}>
          <ReactApexChart
            options={options}
            series={options.series}
            type="area"
            height="100%"
          />
        </div>
      </Stack>
    </div>
  );
};

export default Maingraph;
