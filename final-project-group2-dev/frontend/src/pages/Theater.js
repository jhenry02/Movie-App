import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Form, Dropdown, Button } from 'react-bootstrap';
import MyTheaterCard from '../../src/components/theatercard/TheaterCard';

export default function Theater() {
  const [selectedOption, setSelectedOption] = useState('Sort by:');
  const [location, setLocation] = useState('');
  const [theaters, setTheaters] = useState([]);
  const [maxResults, setMaxResults] = useState(11); // add this line

  const options = ['Best Match', 'Rating', 'Distance'];

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios
      .get('/theatres', {
        params: {
          location: location,
          sort_by: selectedOption.toLowerCase().replace(' ', '_'),
          page: 1,
        },
      })
      .then((response) => {
        console.log(response.data); // Log the response data to the console
        setTheaters(response.data.businesses.slice(0, 10)); // Update the state of theaters with the first 10 items of response data
      })
      .catch((error) => {
        console.error(error); // Log any errors to the console
        // Handle error as needed
      });
  };

  return (
    <>
      <Container className="my-3 ">
        <h4 className="text-center">Theater Search</h4>
        <Form onSubmit={handleSearchSubmit} className="d-flex mx-auto" style={{ maxWidth: '700px' }}>
          <Form.Control
            type="search"
            placeholder="Location (Address,City,Zip) ..."
            className="me-2"
            aria-label="Search"
            onChange={handleLocationChange}
          />
          <Dropdown onSelect={handleSelect} style={{ marginRight: '10px' }}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ width: '125px' }}>
              {selectedOption}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {options.map((option) => (
                <Dropdown.Item key={option} eventKey={option}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="outline-dark" type="submit">
            Search
          </Button>
        </Form>
      </Container>
      <Container className="my-5 ">
        <div className="container container-results">
          {theaters.slice(0, 11).map((theater) => (
            <MyTheaterCard key={theater.id} theater={theater} />
          ))}
        </div>
      </Container>
    </>
  );
}