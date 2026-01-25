import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Barchart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barGap={-40}>
        <CartesianGrid vertical={false} horizontal={false} />

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontWeight: 600 }}
          dy={15}
          tickFormatter={(value) => value.toUpperCase()}
        />

        <YAxis hide={true} />

        <Tooltip
          cursor={false}
          contentStyle={{
            borderRadius: "10px",
            border: "none",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
          }}
        />

        <Bar
          dataKey="max"
          fill="#e2e8f0"
          radius={[10, 10, 10, 10]}
          barSize={40}
          isAnimationActive={false}
          opacity={0.3}
        />

        <Bar
          dataKey="value"
          fill="#2563eb"
          radius={[10, 10, 10, 10]}
          barSize={65}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
