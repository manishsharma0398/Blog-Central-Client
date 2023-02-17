import { Statistic } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDashboardData,
  selectDashboardData,
} from "../../features/user/userSlice";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import LoadingPage from "../../components/common-components/loading-page/LoadingPage";

import "./dashboard.scss";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState([]);

  const dashboardMetaData = useSelector(selectDashboardData);

  const dashboardData = dashboardMetaData?.data;
  const dashboardStatus = dashboardMetaData?.status;
  const dashboardError = dashboardMetaData?.error;

  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  useEffect(() => {
    if (dashboardStatus === "success") {
      const categories = { ...dashboardData?.categories };
      const blogWithCatCounts = dashboardData?.blogCounts;

      let d = [];

      for (const cat in categories) {
        const count = blogWithCatCounts[categories[cat]] || 0;
        d.push({
          id: categories[cat],
          category: cat,
          count,
        });
      }

      setChartData((prevState) => d);
    }
  }, [dashboardStatus]);

  return dashboardStatus === "loading" ? (
    <LoadingPage />
  ) : dashboardStatus === "error" ? (
    <p>error</p>
  ) : (
    <div className="dashboard">
      <h3>Dashboard</h3>

      <div className="dashboard-statistics">
        <div className="dashboard-statistics-card">
          <Statistic title="Total Users" value={dashboardData?.totalUsers} />
        </div>
        <div className="dashboard-statistics-card">
          <Statistic title="Active Users" value={dashboardData?.activeUsers} />
        </div>
        <div className="dashboard-statistics-card">
          <Statistic
            title="Blocked Users"
            value={dashboardData?.blockedUsers}
          />
        </div>
        <div className="dashboard-statistics-card">
          <Statistic title="Total Blogs" value={dashboardData?.totalBlogs} />
        </div>
      </div>

      <div className="dashboard-chart">
        <h2>Blogs per Category</h2>
        <Bar
          data={{
            labels:
              chartData.length > 0
                ? chartData.map((data) => capitalizeFirstLetter(data.category))
                : [],
            datasets: [
              {
                label: "Blogs ",
                data:
                  chartData.length > 0
                    ? chartData.map((data) => data.count)
                    : [],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: false,
                text: "Blogs per category",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};
export default Dashboard;
