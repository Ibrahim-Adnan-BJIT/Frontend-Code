import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { groupId } = useParams(); // Access groupId from params

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
      }
    };

    fetchPosts();
  }, [groupId]);

  const handleViewDetails = (postId) => {
    // Navigate to the post details page with the post ID
    navigate(`/post-details/${postId}`);
  };

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp">All Posts</h1>

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
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostList;
