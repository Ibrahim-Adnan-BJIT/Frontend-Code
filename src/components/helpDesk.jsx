import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, ListGroup } from "react-bootstrap";

const SlotSearch = () => {
  const [slots, setSlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/v2/getAllSlots"
        );
        setSlots(response.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, []); // Fetch slots on component mount

  useEffect(() => {
    // Perform search when slots or searchTerm change
    const results = slots.filter(
      (slot) =>
        slot.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.Speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.date.toString().includes(searchTerm.toString())
    );

    console.log("Slots:", slots);
    console.log("Search Results:", results);

    setSearchResults(results);
  }, [slots, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Slot Search</h1>
      <Form>
        <Form.Group controlId="searchTerm">
          <Form.Control
            type="text"
            placeholder="Search by doctor name, speciality, or date"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>

      {searchResults.length > 0 ? (
        <ListGroup>
          <h2 className="mt-4">Search Results:</h2>
          {searchResults.map((result) => (
            <ListGroup.Item key={result.doctorId}>
              <strong>Doctor Name:</strong> {result.doctorName} <br />
              <strong>Speciality:</strong> {result.Speciality} <br />
              <strong>Date:</strong> {result.date} <br />
              <strong>Start Time:</strong> {result.startTime} <br />
              <strong>End Time:</strong> {result.endTime} <br />
              <strong>Status:</strong> {result.status} <br />
              <strong>Type:</strong> {result.type}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="mt-4">No results found</p>
      )}
    </Container>
  );
};

export default SlotSearch;
