import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 120 },
  { name: 'Mar', value: 150 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 180 },
  { name: 'Jun', value: 170 },
  { name: 'Jul', value: 160 },
];

export const CharSalesMain = () => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="90%" height={400}>
        <LineChart
          width={600}
          height={300}
          data={data}
          style={{
            backgroundColor: '#f5f5f5', // Light background
          }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3366cc" // Blue line color
            strokeWidth={2}
            dot={false}
          />
          <XAxis
            dataKey="name"
            tickLine={false} // Remove axis ticks
            axisLine={false} // Remove axis line
            ticks={[
              { value: 'Jan', label: 'January' },
              { value: 'Mar', label: 'March' },
              { value: 'May', label: 'May' },
              { value: 'Jul', label: 'July' },
            ]} // Custom axis labels
          />
          <YAxis
            tickLine={false} // Remove axis ticks
            axisLine={false} // Remove axis line
            label={{ value: 'Sales', angle: -90 }} // Rotate y-axis label
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
