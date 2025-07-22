import React from 'react';
import './Gallery.css'; // 👈 Create this CSS file

const galleryImages = [
  '/work1.jpg',
  '/work2.jpg',
  '/work3.jpg',
  '/work4.jpg',
  '/work5.jpg',
  '/work6.jpg',
  '/work7.jpg',
  '/work8.jpg',
];

const Gallery = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-uppercase fw-bold"> Gallery</h2>
      <div className="row g-4">
        {galleryImages.map((img, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm overflow-hidden">
              <div className="zoom-wrapper">
                <img
                  src={img}
                  className="card-img-top zoom-image"
                  alt={`Work ${idx + 1}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
