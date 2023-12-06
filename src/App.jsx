import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { cityTemperature } from "@visx/mock-data";
import "./App.css";
import parseCityTemperatureData from "./helpers";

// Steps
// 1. Review the Highcharts basics which I've added from their documentation: https://github.com/highcharts/highcharts-react
// and review the basics of Highcharts: https://www.highcharts.com/docs/chart-concepts/understanding-highcharts
// 2. Explore the mock data we're using (cityTemperature): https://airbnb.io/visx/docs/mock-data

// 3. Build a line chart of temperature over time
// https://www.highcharts.com/docs/chart-and-series-types/line-chart
// Build a mock version without using the cityTemperature data
// Use the cityTemperature data
// Hint: Will need to define x and y values for each series (cannot be derived automatically): https://www.highcharts.com/docs/chart-concepts/series#the-data-in-a-series

// 4. Build a bar chart of average temperature by city
// https://www.highcharts.com/docs/chart-and-series-types/bar-chart
// Build a mock version without using the cityTemperature data
// Use the cityTemperature data
// Hint: Will need to calculate average for each city

// 5. Create buttons that allow you to add/remove cities from the charts

// 6. Adjust the styling - edit the tooltips, add labels for the values on the bar chart, change the colors, etc.

// 7. Add another chart - for example, create an area chart that shows each city's temperature over time

// Note: be careful because Highcharts mutates your data in place: https://github.com/highcharts/highcharts-react/issues/326

// This is based off of the keys in `cityTemperature`
// Using this format limits us to only one hard coded value that we can easily change if the data changes
const CITY_KEYS = ["Austin", "San Francisco", "New York"];

function App() {
  // View the raw data we'll be working with
  console.log("raw data", cityTemperature);

  // Transform and aggregate the data so that we can easily pass it to HighCharts
  const parsedCityTemperatureData = useMemo(() => {
    const transformedData = parseCityTemperatureData(
      CITY_KEYS,
      cityTemperature
    );

    // Sort by average temperature (coldest to warmest)
    transformedData.sort((a, b) => a.mean - b.mean);

    // Hint: you could add a city filter here
    return transformedData;
  }, []);

  // Create the array of series needed for the line chart
  const lineSeriesData = useMemo(() => {
    return parsedCityTemperatureData.map((city) => {
      return {
        name: city.cityName,
        data: city.data,
      };
    });
  }, [parsedCityTemperatureData]);

  // View the parsed data
  console.log("parsed data", parsedCityTemperatureData);
  console.log("line series data", lineSeriesData);

  // Example line chart
  const lineChartOptions = {
    // Line chart is the inferred type so we don't need to include it
    title: {
      text: "Temperature over time",
    },
    series: lineSeriesData,
    xAxis: { type: "datetime" },
    yAxis: { title: { text: "Fahrenheit" } },
  };

  // Example bar chart
  const barChartOptions = {
    chart: { type: "bar" },
    title: {
      text: "Average temperature",
    },
    series: [
      {
        data: parsedCityTemperatureData.map((city) => city.mean),
        name: "Avg. temp",
      },
    ],
    xAxis: {
      categories: parsedCityTemperatureData.map((city) => city.cityName),
    },
    // y is the values that are passed in under series.data for bar and column plots
    yAxis: { title: { text: "Fahrenheit" } },
  };

  return (
    <>
      <h1>Data Viz Demo</h1>
      <div className="card">
        <div className="plot">
          <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
        </div>
        <div className="plot">
          <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
        </div>
      </div>
    </>
  );
}

export default App;
