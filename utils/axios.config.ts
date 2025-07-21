// axios
import axios from "axios";

// init api key
const apikey = process.env.API_ACCESS_KEY;

// handle axios interceptors
axios.interceptors.request.use((config) => {
  // check if api key
  if (apikey) {
    // set apikey to headers
    config.headers.authorization = apikey;
  }

  // set ngrok header in dev
  // if (process.env.NODE_ENV === "development") {
    config.headers["ngrok-skip-browser-warning"] = true;
  // }

  return config;
});

// export axios
export default axios;
