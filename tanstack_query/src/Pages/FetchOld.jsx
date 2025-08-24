import { useEffect, useState } from "react";
import { fetchPost } from "../API/api";

export const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPostData = async () => {
    try {
      const res = await fetchPost();
      // // res.status === 200 ? setPosts(res.data) : [];
      // if (res.status === 200) {
      //   setPosts(res.data);
      //   setIsLoading(false);
      // }
      setPosts(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
      return [];
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  // Conditional rendering based on loading, error, and posts data
  if (isLoading) return <p> Loading....</p>;
  if (isError) return <p> Something went wrong! </p>;

  return (
    <div>
      <ul>
        {posts?.map((curElem) => {
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
