import axios from "axios";

const apiBaseUrl = "https://chaktech.tn/wp-json/wc/v3/products";
const consumerKey = "ck_ee88e50e5d2bcf41a57d9f2d9ee284e46dfaa024";
const consumerSecret = "cs_dfa46d50cde4620434a2b4cdd3894dd9ceaf6bc5";

// Cache for storing responses
const responseCache = new Map();

// Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Authorization: "Basic " + btoa(consumerKey + ":" + consumerSecret),
  },
});

// Axios request interceptor for caching
axiosInstance.interceptors.request.use((config) => {
  const cacheKey = config.url + JSON.stringify(config.params);
  const cachedResponse = responseCache.get(cacheKey);
  if (cachedResponse) {
    // Use cached response if available
    config.adapter = () =>
      Promise.resolve({
        data: cachedResponse,
        status: 200,
        statusText: "OK",
        headers: config.headers,
        config: config,
      });
  }
  return config;
});

// Axios response interceptor for caching
axiosInstance.interceptors.response.use((response) => {
  const cacheKey = response.config.url + JSON.stringify(response.config.params);
  responseCache.set(cacheKey, response.data);
  return response;
});

export const fetchProductsFromAPI = async (page, perPage) => {
  try {
    const response = await axiosInstance.get("", {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};
