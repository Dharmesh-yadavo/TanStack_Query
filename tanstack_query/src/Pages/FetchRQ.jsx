import { NavLink } from "react-router-dom";
import { fetchPost } from "../API/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const FetchRQ = () => {
  //!
  const [pageNumber, setPageNumber] = useState(0);

  const { data, isPending, isError, error } = useQuery({
    //! update
    queryKey: ["posts", pageNumber], // UseState
    queryFn: () => fetchPost(pageNumber), // UseEffect
    // gcTime: 10000, // you can change time from here , default is 5min
    // staleTime: 5000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    //! new
    placeholderData: keepPreviousData,
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
                  <p>{id}</p>
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
      {/* NEW AREA FOR PAGINATION */}
      <div>
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <h2>{pageNumber / 3 + 1}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};
