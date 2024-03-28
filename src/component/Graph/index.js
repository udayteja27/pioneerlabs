import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import "./index.css";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  Filler
);

function App() {
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        setPopulationData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Extracting labels and population data for the line chart
  const lineChartLabels = populationData.map((item) => item.Year);
  const lineChartData = {
    labels: lineChartLabels,
    datasets: [
      {
        label: "Population",
        data: populationData.map((item) => item.Population),
        borderColor: "rgb(39, 154, 38)",
        backgroundColor: "rgb(23,23,23)",
        borderWidth: 1,
      },
    ],
  };
  const donutChartData = {
    labels: populationData.map((item) => item.Year),
    datasets: [
      {
        data: populationData.map((item) => item.Population),
        backgroundColor: [
          "rgb(34,107,33)",
          "rgb(159,255,157)",
          "rgb(3,195,255)",
          "rgb(27,154,89)",
          "rgb(42,180,42)",
        ],
      },
    ],
  };

  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "center", gap: "50px" }}
    >
      <div className="graph">
        <h2 className="graph-heading">Population Data in Different Years</h2>
        <div className="chart">
          <Line data={lineChartData} />
        </div>
      </div>
      <div className="graph">
        <h2 className="graph-heading">Population Distribution</h2>
        <div className="chart">
          <Doughnut data={donutChartData} />
        </div>
      </div>
    </div>
  );
}

export default App;
