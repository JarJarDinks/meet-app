import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ScatterPlot = ({ locations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [data]);

  const getData = () => {
    const data = locations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ')[0];
      return { city, count };
    });
    return data;
  };

  return (
    <div className='data-vis-wrapper'>
      <h4>Events in each city</h4>
      <ResponsiveContainer height={400}>
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
            name='city'
            stroke='#fff'
            angle={60}
            interval={0}
            tick={{ dx: 20, dy: 40, fontSize: 14 }}
          />
          <YAxis
            type='number'
            dataKey='count'
            name='number of events'
            allowDecimals={false}
            stroke='#fff'
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ color: 'white', background: '#333' }}
            labelStyle={{ color: 'white' }}
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
            itemStyle={{ color: 'white', textTransform: 'capitalize' }}
          />
          <Scatter data={data} fill='#fff' />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlot;
