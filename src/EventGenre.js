import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const colors = ['#ffffff', '#ffbdaf', '#ff9c8a', '#ff7b62', 'ee4e34'];

const getData = (events) => {
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
  const data = genres.map((genre) => {
    const value = events.filter(({ summary }) =>
      summary.split(' ').includes(genre)
    ).length;
    return { name: genre, value };
  });
  return data;
};

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getData(events));
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          dataKey='value'
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
