import React from "react";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();

  // Note: Acest plan e premium
  if (isFetching) return <Loader />;

  return (
    <>
      <Loader />
    </>
  );
};

export default Exchanges;
