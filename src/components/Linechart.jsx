import React, { useEffect, useRef } from "react";
import { Col, Row, Typography } from "antd";
import Chart from "chart.js/auto";
import { useParams } from "react-router-dom";
import millify from "millify";

import { useGetCryptoDetailsQuery } from "../services/cryptoApi";

const { Title } = Typography;

const LineChart = ({ coinName }) => {
  const chartRef = useRef(null);
  const { coinuuid } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinuuid);
  const coinInfo = data?.data?.coin;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const generateRandomData = (min, max, length) => {
      return Array.from({ length }, () =>
        Math.floor(Math.random() * (max - min + 1) + min)
      );
    };

    const data = generateRandomData(23000, 45000, 12);

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Price",
            data: data,
            borderColor: "blue",
            borderWidth: 2,
            pointRadius: 5,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
          },
          y: {
            beginAtZero: false,
            suggestedMin: 22000,
            suggestedMax: 46000,
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {/* Dummy change data */}
            Change: {coinInfo.change}%
          </Title>
          <Title level={5} className="current-price">
            {/* Dummy current price data */}
            Current {coinName} Price: $ {millify(coinInfo.price)}
          </Title>
        </Col>
      </Row>
      <canvas ref={chartRef} width={800} height={400} />
    </>
  );
};

export default LineChart;
