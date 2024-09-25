import axios from "axios";
export const getKongToken = async () =>
  axios({
    url: import.meta.env.VITE_KONG_TOKEN_URL,
    method: "POST",
    headers: {
      client_id: import.meta.env.VITE_KONG_CLIENT_ID,
      iss: import.meta.env.VITE_KONG_ISS,
      secret: import.meta.env.VITE_KONG_SECRET,
    },
  }).then((response) => {
    return response.data.token;
  });
