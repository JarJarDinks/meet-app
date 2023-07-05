import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CityEventsChart = ({ locations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const newData = locations.map((location) => {
        const count = events.filter(
          (event) => event.location === location
        ).length;
        const city = location.split(/, | - /)[0];
        return { city, count };
      });
      return newData;
    };

    setData(getData());
  }, [locations, events]);

  return (
    <ResponsiveContainer width='99%' height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}>
        <CartesianGrid />
        <XAxis
          type='category'
          dataKey='city'
          name='City'
          angle={60}
          interval={0}
          tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis type='number' dataKey='y' name='weight' unit='kg' />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name='A school' data={data} fill='#8884d8' />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
