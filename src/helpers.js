const parseCityTemperatureData = (cityKeys, cityTemperatureData) => {
  // This is our desired data structure
  const cityArray = cityKeys.map((city) => {
    return { cityName: city, data: [], sumTemperature: 0, mean: null };
  });
  // Aggregate the data in a way that we can plot it
  const transformedCityTemperatureData = cityTemperatureData.reduce(
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
};

export default parseCityTemperatureData;
