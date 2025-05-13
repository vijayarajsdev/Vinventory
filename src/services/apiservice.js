import axios from "axios";

const apiurl = "http://localhost:5000";

const apiService = axios.create({
  baseURL: apiurl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// GET Service
const getService = async (url, config = {}) => {
  try {
    const response = await apiService.get(url, config);
    return response;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

// POST Service (with request body)
const postService = async (url, data = {}, config = {}) => {
  try {
    const response = await apiService.post(url, data, config);
    return response;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

// PUT Service (with request body)
const putService = async (url, data = {}, config = {}) => {
  try {
    const response = await apiService.put(url, data, config);
    return response;
  } catch (error) {
    console.error("Error in PUT request:", error);
    throw error;
  }
};

// DELETE Service (with optional request body)
const deleteService = async (url, config = {}) => {
  try {
    const response = await apiService.delete(url, config);
    return response;
  } catch (error) {
    console.error("Error in DELETE request:", error);
    throw error;
  }
};

export { getService, postService, putService, deleteService };
