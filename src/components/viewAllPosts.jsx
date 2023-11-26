import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { groupId } = useParams(); // Access groupId from params
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8070/api/community/getByGroupId/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Error fetching posts", { position: toast.POSITION.BOTTOM_RIGHT });
      }
    };

    fetchPosts();
  }, [groupId]);

  const handleViewDetails = (postId) => {
    // Navigate to the post details page with the post ID
    navigate(`/post-details/${postId}`);
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8070/api/community/delete/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optionally, you can update the state or re-fetch posts after successful deletion
      const updatedPosts = posts.filter((post) => post.postId !== postId);
      setPosts(updatedPosts);
      
      // Show success toast
      toast.success("Post deleted successfully!", { position: toast.POSITION.BOTTOM_RIGHT });
    } catch (error) {
      console.error("Error deleting post:", error.response.data.message);
      
      // Show error toast
      toast.error("Error deleting post", { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  return (
    <div className="page-section">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0 wow fadeInUp">Group Posts</h1>
          <div className="d-flex">
            <Link to={`/my-posts/${groupId}`} className="btn btn-primary mr-2">
              MyPosts
            </Link>
            <Link to={`/post-here/${groupId}`} className="btn btn-success">
              Post Here
            </Link>
          </div>
        </div>

        {posts.map((post) => (
          <Card
            key={post.postId}
            className="mb-4"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Card.Body>
              <Card.Text>
                <strong>Author:</strong> {post.patientId}{" "}
                {/* Replace with actual author property */}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {post.description}
              </Card.Text>
              {/* Fetch author details using postId */}

              {/* Add more attributes as needed */}
              {/* <Card.Text><strong>Attribute:</strong> {post.attribute}</Card.Text> */}
              <Button
                variant="primary"
                onClick={() => handleViewDetails(post.postId)}
              >
                View Details
              </Button>

              {userRole === "ADMIN" && (
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleDelete(post.postId)}
                >
                  Delete
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostList;
