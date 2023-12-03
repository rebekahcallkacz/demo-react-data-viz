import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { cityTemperature } from "@visx/mock-data";
import "./App.css";

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
  // View the data we'll be working with
  // console.log(cityTemperature);

  // Transform and aggregate the data so that we can easily pass it to HighCharts
  const parsedCityTemperatureData = useMemo(() => {
    // This is our desired data structure
    const cityArray = CITY_KEYS.map((city) => {
      return { cityName: city, data: [], sumTemperature: 0, mean: null };
    });
    // Aggregate the data in a way that we can plot it
    const transformedCityTemperatureData = cityTemperature.reduce(
      (parsedData, currentValue) => {
        // Get the date of the current value
        const date = currentValue["date"];
        // For each city, add the current data
        parsedData.forEach((cityObject) => {
          const city = cityObject.cityName;
          // Get the temp for the current city
          const temp = parseFloat(currentValue[city]);
          // Highchats wants data in the format [[x1,y1], [x2, y2]]
          cityObject.data.push([date, temp]);
          // Add the temp to the running total (will be used to calculate average/mean)
          cityObject.sumTemperature = cityObject.sumTemperature + temp;
        });

        return parsedData;
      },
      cityArray
    );
    // Calculate the mean temp for each city
    transformedCityTemperatureData.forEach((cityObject) => {
      cityObject.mean = cityObject.sumTemperature / cityObject.data.length;
    });
    return transformedCityTemperatureData;

    // Hint: you could add city filter here
  }, []);

  console.log(parsedCityTemperatureData);

  const options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };
  return (
    <>
      <h1>Data Viz Demo</h1>
      <div className="card">
        <p>Put a chart here</p>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}

export default App;
