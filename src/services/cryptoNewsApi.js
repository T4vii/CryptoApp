import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": "0d1a0d8c14msh30669e65771fabap10a5d7jsn05846196eedc",
  "X-RapidAPI-Host": "cnbc.p.rapidapi.com",
};

const baseUrl = "https://cnbc.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(`/news/v2/list-trending`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
