import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="company-mission">
        <h2>Our Mission</h2>
        <p>At PropCloud.io, our mission is to transform property management for short-term rental hosts through automation and innovation. We aim to help hosts save time, increase revenue, and provide exceptional guest experiences.</p>
      </div>
      <div className="company-vision">
        <h2>Our Vision</h2>
        <p>We envision a world where property management is seamless, efficient, and enjoyable. By leveraging cutting-edge technology, we strive to empower property managers to scale their businesses and achieve operational excellence.</p>
      </div>
      <div className="trust-indicators">
        <h2>Why Trust Us?</h2>
        <ul>
          <li>Proven track record of success in property management</li>
          <li>Trusted by hundreds of property managers worldwide</li>
          <li>Committed to continuous improvement and innovation</li>
          <li>Dedicated to providing exceptional customer support</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutUs;
