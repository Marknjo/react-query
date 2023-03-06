import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { PostDetail, Post } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["em-posts"], queryFn: fetchPosts });

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
        <h4>Oops! Something was wrong when loading Posts. Try again!</h4>
        <p>{error!.toString()}</p>
      </div>
    );
  }

  // replace with useQuery
  const data: Post[] | [] = posts;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
