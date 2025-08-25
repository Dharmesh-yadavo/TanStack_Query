import { NavLink } from "react-router-dom";
import { deletePost, fetchPost } from "../API/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  //! new
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber], // UseState
    queryFn: () => fetchPost(pageNumber), // UseEffect
    // gcTime: 10000, // you can change time from here , default is 5min
    // staleTime: 5000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
  });

  //! Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      // console.log(data);
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
    },
  });

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
                {/* DELETE POST BUTTON  */}
                <button onClick={() => deleteMutation.mutate(id)}>
                  Delete
                </button>
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
