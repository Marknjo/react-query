import { useMutation, useQuery } from "@tanstack/react-query";

async function fetchComments(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId: number) {
  // const response = await fetch(
  //   `https://jsonplaceholder.typicode.com/postId/${postId}`,
  //   { method: "DELETE" }
  // );
  // return response.json();
  let res = await new Promise((resolve) => {
    setTimeout(() => resolve(`Success: Post Id (${postId}) deleted`), 2000);
  });

  return {
    message: res,
  };
}

export interface Post {
  userId: number;
  title: string;
  body: string;
  id: number;
}

export interface Comment {
  body: string;
  email: string;
  id: string;
}

async function updatePost(postId: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ data: { title: "REACT QUERY FOREVER!!!!" } }),
    }
  );
  return response.json();
}

export function PostDetail({ post }: { post: Post }) {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post-comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  const mutation = useMutation((postId: number) => deletePost(postId));

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h4>
          Oops! Something was wrong when loading Post Comments. Try again!
        </h4>
        <p>{error!.toString()}</p>
      </div>
    );
  }

  // replace with useQuery
  const data: Comment[] | [] = comments;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>

      <button onClick={() => mutation.mutate(post.id)}>Delete</button>
      <button>Update title</button>

      {mutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting Post...</p>
      )}
      {mutation.isSuccess && (
        <p style={{ color: "green" }}>{mutation?.data?.message as string}</p>
      )}
      {mutation.isError && (
        <p style={{ color: "red" }}>
          Oops! Could not delete post id: {post.userId}
        </p>
      )}

      <p>{post.body}</p>
      <h4>Comments</h4>

      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
