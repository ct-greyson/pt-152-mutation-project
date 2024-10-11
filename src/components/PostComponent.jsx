import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";

const PostComponent = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [post, setPost] = useState(null);

  const createPost = async () => {
    const responsePost = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    return JSON.parse(responsePost.data.body);
  };

  // mutate - function we need to manually call to make our API call
  const { mutate } = useMutation({
    mutationFn: createPost, //function that makes API call
    //onSuccess gets access to the data returned from our mutationFn (createPost)
    // then we utilize it in a function that we want to run when we successfully make that API call
    onSuccess: (data) => {
      console.log(data);
      //modify our post state to equal the data returned from the API call
      setPost(data);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {/* display our post */}
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
    </>
  );
};

export default PostComponent;
