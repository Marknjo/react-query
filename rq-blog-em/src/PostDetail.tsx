async function fetchComments({ postId }: { postId: string }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

export interface Post {
  title: string;
  body: string;
  id: string;
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
  // replace with useQuery
  const data: Comment[] | [] = [];

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
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
