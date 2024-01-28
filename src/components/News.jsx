import React from "react";
import { Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import Loader from "./Loader";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const { data: cryptoNews, error } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 6 : 12,
  });

  if (error) return "Error fetching data...";

  if (!cryptoNews?.data) return <Loader />;

  const newsList = simplified
    ? cryptoNews.data.mostPopularEntries.assets.slice(0, 6)
    : cryptoNews.data.mostPopularEntries.assets;

  return (
    <Row gutter={(24, 24)}>
      {newsList.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news?.section?.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.shorterHeadline}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.promoImage?.url || demoImage}
                  alt="News"
                />
              </div>
              <p>{news.description}</p>

              <div className="provider-container">
                <div>
                  <Avatar src={news?.promoImage?.url || demoImage} alt="News" />
                  <Text className="provider-name">{news.authorFormatted}</Text>
                </div>
                <Text>
                  {moment(news.dateFirstPublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
