import React, { useEffect, useRef } from "react";

import { Col, Row, Typography } from "antd";
import Chart from "chart.js/auto";

import "chartjs-adapter-date-fns";
import "chartjs-plugin-datalabels";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  const chartRef = useRef(null);

  for (let i = 0; i < coinHistory?.data?.sparkline?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.sparkline[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.sparkline?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.sparkline[i].timestamp).toLocaleDateString()
    );
  }

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    let chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Price In USD",
            data: coinPrice,
            fill: false,
            backgroundColor: "#0071bd",
            borderColor: "#0071bd",
            yAxisID: "yAxis",
          },
        ],
      },
      options: {
        scales: {
          yAxis: {
            ticks: {
              beginAtZero: true,
            },
          },
          xAxis: {
            type: "time",
          },
        },
        plugins: {
          datalabels: {
            // Add datalabels configuration here
            display: false,
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [coinPrice]);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <canvas ref={chartRef} />
    </>
  );
};

export default LineChart;
