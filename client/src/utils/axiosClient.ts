import axios from "axios";

const config = {
  baseURL:  import.meta.env.VITE_BACK_BASE_URL,
}

export default axios.create(config)
