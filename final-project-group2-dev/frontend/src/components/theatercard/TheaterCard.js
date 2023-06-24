import React from 'react';
import { Card } from 'react-bootstrap';
import EmptyImage from "../../../src/images/no-image-available.jpg";

export default function MyTheaterCard({ theater }) {
  const { name, image_url, location, rating, review_count, categories } = theater;

  return (
    <div className="container" style={{ maxHeight: '200px' }}>
      <Card className="mb-3">
        <div className="row g-0">
          <div className="col-md-2 d-flex align-items-center justify-content-center bg-dark">
            <Card.Img
              variant="top "
              src={image_url || EmptyImage}
              className="img-fluid rounded-start"
              alt="Theater"
              style={{ width: '100%', height: 'auto', maxWidth: '200px', maxHeight: '200px' }}
            />
          </div>
          <div className="col-md-10">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{location.address1}</Card.Text>
              <Card.Text>
                {categories.map((category) => (
                  <span key={category.alias} className="me-2">
                    {category.title}
                  </span>
                ))}
              </Card.Text>
              <Card.Text>Rating: {rating}</Card.Text>
              <Card.Text>Reviews: {review_count}</Card.Text>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
}
