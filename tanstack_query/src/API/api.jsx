import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// to fetch the data :
export const fetchPost = async (pageNumber) => {
  const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
  return res.status === 200 ? res.data : [];
};

// to fetch the individual data :
export const fetchIndvData = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

// to delete post
export const deletePost = async (id) => {
  return await api.delete(`/posts/${id}`);
};

// to update the post ---> for update we can use put, patch
export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, { title: "I have Updated" });
};

//* infinite Scrolling
export const fetchUsers = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
