import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // change your backend URL here
});

// Create link
export const createLink = (data) => API.post("/api/create", data);

// List links
export const getLinks = ({ page , limit  } = {}) => {
  return API.get(`/api/list?page=${page}&limit=${limit}`);
};
export const getLinkById = (code) => {
  return API.get(`/api/view/${code}`);
};

// Get stats
export const getLinkStats = (code) => API.get(`/api/links/${code}`);

// Delete link
export const deleteLink = (code) => API.delete(`/api/delete/${code}`);
