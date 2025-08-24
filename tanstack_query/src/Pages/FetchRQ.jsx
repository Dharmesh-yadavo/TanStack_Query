import { fetchPost } from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
  });

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
