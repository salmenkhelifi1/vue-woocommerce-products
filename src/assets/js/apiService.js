// apiService.js
import axios from "axios";

const API_URL = "https://dev.chaktech.tn/wp-json/wc/v3/products";
const CONSUMER_KEY = "ck_7b01fd64d193858ddf4194bf7b753752f7b0f29b";
const CONSUMER_SECRET = "cs_da3063ac35860e60377003a75a8804efec5b5be4";
const PER_PAGE = 100; // Number of products to fetch per page

export async function fetchData(page = 1) {
  try {
    const response = await axios.get(API_URL, {
      auth: {
        username: CONSUMER_KEY,
        password: CONSUMER_SECRET,
      },
      params: {
        per_page: PER_PAGE,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error back to the caller
  }
}

// // apiService.js
// import axios from "axios";

// export async function fetchData() {
//   try {
//     const response = await axios.get("/data.json");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Propagate the error back to the caller
//   }
// }

// import axios from "axios";

// const API_URL = "https://chaktech.tn/wp-json/wc/v3/products";
// const CONSUMER_KEY = "ck_ee88e50e5d2bcf41a57d9f2d9ee284e46dfaa024";
// const CONSUMER_SECRET = "cs_dfa46d50cde4620434a2b4cdd3894dd9ceaf6bc5";
// const PER_PAGE = 100; // Number of products to fetch per page

// // Function to fetch data with caching
// export async function fetchData(page = 1) {
//   const cacheKey = `products_page_${page}`;
//   const cachedData = localStorage.getItem(cacheKey);

//   if (cachedData) {
//     try {
//       return JSON.parse(cachedData);
//     } catch (error) {
//       console.error("Error parsing cached data:", error);
//       localStorage.removeItem(cacheKey); // Remove invalid cache
//     }http://dev-products.chaktech.tn/
//   }

//   try {
//     const response = await axios.get(API_URL, {
//       auth: {
//         username: CONSUMER_KEY,
//         password: CONSUMER_SECRET
//       },
//       params: {
//         per_page: PER_PAGE,
//         page: page
//       }
//     });

//     const newData = response.data;
//     localStorage.setItem(cacheKey, JSON.stringify(newData)); // Cache the fetched data
//     return newData;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Propagate the error back to the caller
//   }
// }
