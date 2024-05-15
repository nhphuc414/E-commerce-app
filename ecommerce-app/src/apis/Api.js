import axios from "axios";
const HOST = "https://nhphuc414.pythonanywhere.com";
export const endpoints = {
  register: "/users/",
  login: "/o/token/",
  "current-user": "/users/current-user/",
  "request-store": "/stores/",
  "list-request-store": "/stores/inactive-store/",
  "accept-store": (storeId) => `/stores/${storeId}/confirm-store/`,
  "denied-store": (storeId) => `/stores/${storeId}/reject-store/`,
  "add-product": "/products/",
  products: "/products/",
  "place-order": "/place-order/",
};
export default axios.create({
  baseURL: HOST,
});
export const authApi = (accessToken) =>
  axios.create({
    baseURL: HOST,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
