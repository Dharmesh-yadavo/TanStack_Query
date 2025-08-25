import { useQuery } from "@tanstack/react-query";
import { fetchIndvData } from "../API/api";
import { NavLink, useParams } from "react-router-dom";

export const FetchIndv = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", id], // UseState
    queryFn: () => fetchIndvData(id), // UseEffect
  });

  // Conditional rendering based on loading, error, and posts data
  if (isPending) return <p> Loading....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <h1>Post Details - {data.id}</h1>
      <div>
        <p>ID: {data.id} </p>
        <p>Title: {data.title}</p>
        <p>Body: {data.body}</p>
      </div>
      <NavLink to={"/rq"}>
        <button>Go Back</button>
      </NavLink>
    </div>
  );
};
