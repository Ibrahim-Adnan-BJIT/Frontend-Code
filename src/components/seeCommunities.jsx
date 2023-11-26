import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleJoinGroup = (groupId) => {
    navigate(`/category/${groupId}`);
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8070/api/community/delete/group/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state or re-fetch categories after successful deletion
      const updatedCategories = categories.filter(
        (category) => category.groupId !== groupId
      );
      setCategories(updatedCategories);

      // Show success toast
      toast.success("Group deleted successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error("Error deleting group:", error.response.data.message);

      // Show error toast
      toast.error("Error deleting group", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp">Our Communities</h1>

        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search by group name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form>

        <div className="row">
          {filteredCategories.map((category) => (
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
                    onClick={() => handleJoinGroup(category.groupId)}
                  >
                    Join Group
                  </Button>

                  {userRole === "ADMIN" && (
                    <Button
                      variant="danger"
                      className="ml-2"
                      onClick={() => handleDeleteGroup(category.groupId)}
                    >
                      Delete Group
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllCategories;
