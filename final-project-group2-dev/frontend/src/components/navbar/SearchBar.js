import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "../../index.css";

export default function MySearchBar() {

  //Set states
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigate to search results page
    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search movies..."
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleSearch}
      />

      <Button variant="outline-light" type="submit">Search</Button>

    </Form>
  )
}

