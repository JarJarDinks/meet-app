import React, { useEffect, useState } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const EventGenre = ({ events }) => {
  const colors = ['#ffffff', '#ffbdaf', '#ff9c8a', '#ff7b62', 'ee4e34'];
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

  useEffect(() => {
    setData(() => getData(events));
  }, [events]);

  const [data, setData] = useState([]);

  function getData() {
    const data = genres.map((genre, index) => {
      const value = events.filter(({ summary }) =>
        summary.split(' ').includes(genre)
      ).length;
      return { name: genre, value, fill: colors[index] };
    });
    return data;
  }

  const outerRadius = Math.min(80, Math.floor(400 / (genres.length + 1)));

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={outerRadius}
          labelPosition='outside'
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Legend
          verticalAlign='bottom'
          layout='horizontal'
          formatter={(value, entry, index) => (
            <span style={{ color: entry.color }}>{entry.payload.name}</span>
          )}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
