import React, {useState} from "react";
import Chart from "react-apexcharts";

const Smallgraph = ({data, title}) => {
  const option = {
    options: {
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
        axisBorder: {
          show: false, // remove axis border
        },
        axisTicks: {
          show: false, // remove axis ticks
        },
        labels: {
          show: false, // remove axis labels
        },
      },
      yaxis: {
        labels: {
          show: false, // remove y-axis labels
        },
      },
      grid: {
        show: false, // remove grid lines
      },
      chart: {
        toolbar: {
          show: false, // remove toolbar
        },
        // Add rounded border
        sparkline: {
          enabled: true,
        },
      },
      legend: {
        show: false, // remove legend
      },
      stroke: {
        show: true,
        curve: "straight",
        lineCap: "butt",
        // colors: undefined,
        width: 1,
        dashArray: 0,
      },
      colors: [
        data &&
        Math.sign(
          data?.prices[data?.prices.length - 1] -
            data?.prices[data?.prices.length - 2]
        ) === -1
          ? "#A90F0F"
          : "#00ff00",
      ],
    },
  };

  return (
    <div>
      {data && (
        <Chart
          options={data && option.options}
          series={[
            {
              name: title,
              data: data && [...data?.prices],
            },
          ]}
          type="line"
          width="200"
          height="30"
        />
      )}
    </div>
  );
};

export default Smallgraph;
