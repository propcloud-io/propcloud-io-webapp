import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <h3>Step 1</h3>
          <p>Sign up and create your account</p>
        </div>
        <div className="step">
          <h3>Step 2</h3>
          <p>Add your properties and set preferences</p>
        </div>
        <div className="step">
          <h3>Step 3</h3>
          <p>Automate sales, operations, and communications</p>
        </div>
        <div className="step">
          <h3>Step 4</h3>
          <p>Monitor performance and optimize</p>
        </div>
        <div className="step">
          <h3>Step 5</h3>
          <p>Enjoy increased revenue and time savings</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
