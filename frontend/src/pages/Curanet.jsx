import React, { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Curanet = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Dr. Smith",
      content: "What are the most effective treatments for chronic headaches?",
      comments: [
        {
          id: 1,
          author: "User1",
          content: "I tried acupuncture, and it worked wonders!",
        },
        {
          id: 2,
          author: "User2",
          content: "Meditation helped reduce my stress-induced headaches.",
        },
      ],
      likes: 5,
      showComments: false,
      liked: false,
    },
    {
      id: 2,
      author: "Dr. Lee",
      content: "How can we manage anxiety without medication?",
      comments: [
        {
          id: 1,
          author: "User3",
          content: "Regular exercise and mindfulness really helped me.",
        },
      ],
      likes: 3,
      showComments: false,
      liked: false,
    },
    {
      id: 3,
      author: "Dr. Johnson",
      content: "What are the latest advancements in treating diabetes?",
      comments: [
        {
          id: 1,
          author: "User4",
          content:
            "There are some promising developments in stem cell therapy.",
        },
        {
          id: 2,
          author: "User5",
          content: "Diet and lifestyle changes are still the best options.",
        },
      ],
      likes: 8,
      showComments: false,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState({ author: "", content: "" });

  const toggleComments = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const addLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes + (post.liked ? -1 : 1),
              liked: !post.liked,
            }
          : post
      )
    );
  };

  const addComment = (postId, commentText) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  author: "You",
                  content: commentText,
                },
              ],
            }
          : post
      )
    );
  };

  const handleAddPost = () => {
    if (newPost.author && newPost.content) {
      const newDiscussion = {
        id: posts.length + 1,
        author: newPost.author,
        content: newPost.content,
        comments: [],
        likes: 0,
        showComments: false,
        liked: false,
      };
      setPosts([newDiscussion, ...posts]);
      setNewPost({ author: "", content: "" });
    }
  };

  return (
    <div className="p-4 mx-auto max-w-2xl text-gray-800">
      <h2 className="text-center text-3xl font-semibold py-6 text-gray-700">
        CuraNet Discussions
      </h2>

      {/* Add New Discussion Section */}
      <div className="border rounded-lg p-4 mb-6 shadow-md">
        <h3 className="font-semibold text-lg mb-2">Add New Discussion</h3>
        <input
          type="text"
          placeholder="Author"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Write your discussion content here..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="border p-2 rounded w-full mb-2"
          rows="4"
        />
        <button
          onClick={handleAddPost}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Add Discussion
        </button>
      </div>

      {/* Existing Discussions Section */}
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg">{post.author}</h3>
          <p className="mt-2 mb-4 text-gray-700">{post.content}</p>
          <div className="flex gap-4">
            <button
              onClick={() => addLike(post.id)}
              className={`px-4 py-1 rounded transition duration-200 ${
                post.liked ? "bg-blue-100 text-blue-600" : "text-gray-500"
              }`}
            >
              {" "}
              <ThumbUpOffAltIcon />
              {post.likes}
            </button>
            <button
              onClick={() => toggleComments(post.id)}
              className="text-gray-500 hover:text-blue-500 transition duration-200"
            >
              <ChatBubbleOutlineIcon />
            </button>
          </div>
          {post.showComments && (
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">Comments</h4>
              {post.comments.map((comment) => (
                <div key={comment.id} className="border-t pt-2 mt-2 text-sm">
                  <strong>{comment.author}:</strong> {comment.content}
                </div>
              ))}
              <div className="mt-2 flex">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-grow border p-2 rounded"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      addComment(post.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Curanet;
