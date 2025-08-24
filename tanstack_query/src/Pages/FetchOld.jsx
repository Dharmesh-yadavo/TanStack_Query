import { useEffect, useState } from "react";
import { fetchPost } from "../API/api";

export const FetchOld = () => {
  const [posts, setPosts] = useState([]);

  const getPostData = async () => {
    try {
      const res = await fetchPost();
      res.status === 200 ? setPosts(res.data) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div>
      <ul>
        {posts.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
