import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      {/* Heading */}
      <h1 className="text-center mb-4 text-primary fw-bold">About Us</h1>
      <p className="text-center text-muted mb-5">
        This portal is managed by <strong>Pankaj Luthra</strong> (Jhilmil Ward 216) 
        to serve the community with complaint management and public welfare activities. 
        We also celebrate our festivals together with unity and joy.
      </p>

      <div className="row g-4">
        {/* Card 1 */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">Who is Pankaj Luthra?</h5>
              <p className="card-text">
                Pankaj Luthra is a community leader of Jhilmil Ward 216. 
                He actively works for the welfare of residents, including 
                cleanliness, complaint resolution, and social welfare programs.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-success">Our Mission</h5>
              <p className="card-text">
                Our mission is to create a transparent and effective 
                communication channel between residents and ward authorities. 
                We aim to resolve complaints quickly and provide timely 
                community services.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 (Festivals instead of Kite Distribution) */}
        <div className="col-md-4">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title text-danger">Festivals & Celebrations</h5>
              <p className="card-text">
                With <strong>Diwali</strong>, <strong>Dussehra</strong>, and 
                <strong> Bhai Dooj</strong> around the corner, our ward 
                celebrates these festivals with joy, unity, and cultural 
                programs for residents. 
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
              <h5 className="card-title text-info">Community Complaints</h5>
              <p className="card-text">
                Through this portal, residents can file complaints related 
                to sanitation, road maintenance, or any public issues. Each 
                complaint is tracked using a unique complaint ID for faster 
                and better resolution.
              </p>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
              <h5 className="card-title text-warning">Helpline</h5>
              <p className="card-text">
                For immediate help or assistance, contact our helpline numbers:
                <br />
                <strong>8700115912, 9311981939</strong>
                <br />
                We are here to listen and resolve issues efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
