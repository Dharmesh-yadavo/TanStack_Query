import { NavLink } from "react-router-dom";
import { fetchPost } from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"], // UseState
    queryFn: fetchPost, // UseEffect
    // gcTime: 10000, // you can change time from here , default is 5min
    // staleTime: 5000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  // console.log(data);

  // Conditional rendering based on loading, error, and posts data
  if (isPending) return <p> Loading....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul>
        {Array.isArray(data) ? (
          data.map((curElem) => {
            const { id, title, body } = curElem;
            return (
              <li key={id}>
                <NavLink to={`/rq/${id}`}>
                  <p>{title}</p>
                  <p>{body}</p>
                </NavLink>
              </li>
            );
          })
        ) : (
          <p>No data available</p>
        )}
      </ul>
    </div>
  );
};
