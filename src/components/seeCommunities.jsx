import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Replace 'yourTokenKey' with your actual token key
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8070/api/community/get/AllGroups",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp">Our Communities</h1>

        <div className="row">
          {categories.map((category) => (
            <div key={category.groupId} className="col-md-4 mb-4">
              <Card
                className="h-100"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {category.groupId % 2 === 0 ? (
                  <Card.Img
                    variant="top"
                    src="https://i0.wp.com/pediaa.com/wp-content/uploads/2023/01/Community-Health.jpg?fit=640%2C427&ssl=1"
                    alt={`Image for category ${category.groupId}`}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src="https://150225392.v2.pressablecdn.com/wp-content/uploads/2021/10/community-health-nurse-with-patient-1200x628-1.jpg"
                    alt={`Image for category ${category.groupId}`}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{category.groupName}</Card.Title>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/category/${category.groupId}`)}
                  >
                    Join Group
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
