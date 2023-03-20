import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Country } from "../../types/countryType";

import type { ChartData, ChartOptions } from "chart.js";
import { FilterType } from "../../types/pieChartTypes";

ChartJS.register(ArcElement, Tooltip, Legend);

const filterBy = (countries: Country[], filter: FilterType) => {
  let filteredLabels: Set<string | undefined>,
    filteredData: any[] = [];
  switch (filter) {
    case "region":
    case "subregion":
      filteredLabels = new Set(countries.map((country) => country[filter]));
      filteredLabels.forEach((label: string | undefined) =>
        filteredData.push({
          label,
          value: countries.filter((country) => country[filter] === label)
            .length,
        })
      );
      break;
    case "population":
      countries.forEach((country) =>
        filteredData.push({
          label: country.name.common,
          value: country[filter],
        })
      );
      break;
    case "side":
      filteredLabels = new Set(countries.map((country) => country.car[filter]));
      filteredLabels.forEach((currLabel) =>
        filteredData.push({
          label:
            currLabel === "left" ? "Left-hand driving" : "Right-hand driving",
          value: countries.filter(
            (country) => country.car[filter] === currLabel
          ).length,
        })
      );
      break;
    case "independent":
    case "unMember":
      const booleanLabels = new Array<boolean>(true, false);
      booleanLabels.forEach((currLabel) =>
        filteredData.push({
          label:
            filter === "independent"
              ? currLabel
                ? "Independent"
                : "Not independent"
              : currLabel
              ? "UN Member"
              : "Not a UN Member",
          value: countries.filter((country) => country[filter] === currLabel)
            .length,
        })
      );
      break;
    case "continents":
      filteredLabels = new Set(countries.map((country) => country[filter][0]));
      filteredLabels.forEach((label: string | undefined) =>
        filteredData.push({
          label,
          value: countries.filter((country) => country[filter][0] === label)
            .length,
        })
      );
      break;
    default:
      return {
        labels: ["Together we are one"],
        data: [1],
      };
  }
  return {
    labels: filteredData.map((data) => data.label),
    data: filteredData.map((data) => data.value),
  };
};

const randomColor = (opacity: number) => {
  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
  return `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, ${opacity})`;
};

const PieChart = (props: {
  countries: Country[];
  filterOption: FilterType;
}) => {
  const { countries, filterOption } = props;

  const filtered = filterBy(countries, filterOption);

  const data: ChartData<"pie"> = {
    labels: filtered.labels,
    datasets: [
      {
        label:
          filterOption === "population" ? "population" : "number of countries",
        data: filtered.data,
        backgroundColor: filtered.labels.map(() => randomColor(0.8)),
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          color: "black",
          font: {
            size: 20,
            family: "'Nunito', sans-serif",
          },
        },
      },
    },
  };

  return (
    <Box>
      <Box
        sx={{
          width: { xs: "80vw", sm: "70vw", md: "50vw", lg: "30vw" },
          height: { xs: "80vw", sm: "70vw", md: "50vw", lg: "30vw" },
        }}
      >
        <Pie data={data} options={options} />
      </Box>
      <Typography
        variant='body1'
        fontSize='1.2rem'
        align='center'
        sx={{ mt: "1rem" }}
      >{`Data filtered by '${filterOption}' parameter`}</Typography>
    </Box>
  );
};

export default PieChart;
