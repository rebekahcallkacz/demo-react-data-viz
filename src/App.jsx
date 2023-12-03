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
    // Hint: you could add a city filter here
    return transformedData;
  }, []);

  // View the parsed data
  console.log("parsed data", parsedCityTemperatureData);

  // Example line chart
  const lineChartOptions = {
    // Line chart is the inferred type so we don't need to include it
    title: {
      text: "My line chart",
    },
    series: [
      {
        data: [1, 3, 5],
      },
    ],
    xAxis: { title: { text: "Values I passed in" } },
    yAxis: { title: { text: "Inferred values" } },
  };

  // Example bar chart
  const barChartOptions = {
    chart: { type: "bar" },
    title: {
      text: "My bar chart",
    },
    series: [
      {
        data: [1, 3, 5],
      },
    ],
    xAxis: { title: { text: "Inferred values" } },
    // y is the values that are passed in under series.data for bar and column plots
    yAxis: { title: { text: "Values I passed in" } },
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
