import { fetchPost } from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"], // UseState
    queryFn: fetchPost, // UseEffect
  });

  // Conditional rendering based on loading, error, and posts data
  if (isPending) return <p> Loading....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul>
        {data?.map((curElem) => {
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
