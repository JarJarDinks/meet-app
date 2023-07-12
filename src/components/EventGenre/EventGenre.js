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
  useEffect(() => {
    const colors = ['#ffffff', '#ffbdaf', '#ff9c8a', '#ff7b62', 'ee4e34'];
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

    function getData() {
      const filteredGenres = genres.filter((genre) => {
        const value = events.filter(({ summary }) =>
          summary.split(' ').includes(genre)
        ).length;
        return value > 0;
      });

      const data = filteredGenres.map((genre, index) => {
        const value = events.filter(({ summary }) =>
          summary.split(' ').includes(genre)
        ).length;
        return { name: genre, value, fill: colors[index] };
      });
      return data;
    }

    setData(() => getData(events));
  }, [events]);

  const [data, setData] = useState([]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
    const { name, fill } = data[index];

    return (
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'>
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className='data-vis-wrapper'>
      <ResponsiveContainer height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey='value'
            nameKey='name'
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            labelPosition='outside'
            label={renderCustomizedLabel}>
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
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
            labelStyle={{ color: 'white' }}
            itemStyle={{ color: 'white' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventGenre;
