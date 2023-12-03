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
function App() {
  // View the data we'll be working with
  console.log(cityTemperature);

  const cityTemperatureObject = [
    {
      cityName: "",
      data: [
        ["xValue1", "yValue1"],
        ["xValue2", "yValue2"],
      ],
      mean: 0,
    },
  ];
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
