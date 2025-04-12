import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is PropCloud.io?",
      answer: "PropCloud.io is an autonomous property management platform for short-term rental hosts, automating sales, operations, and guest communications."
    },
    {
      question: "How does the waitlist process work?",
      answer: "Sign up with your email to join the waitlist. We will notify you when we are ready to onboard new users."
    },
    {
      question: "What are the platform capabilities?",
      answer: "Our platform offers sales automation, operations automation, and communications automation to help you manage your properties efficiently."
    },
    {
      question: "What is the pricing model?",
      answer: "Our pricing model is based on a subscription plan. Details will be provided once we launch."
    },
    {
      question: "How can I increase my revenue with PropCloud.io?",
      answer: "Our platform helps you optimize pricing, manage direct bookings, and improve guest satisfaction, leading to increased revenue."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we prioritize data security and use industry-standard measures to protect your information."
    },
    {
      question: "Can I manage multiple properties with PropCloud.io?",
      answer: "Yes, our platform is designed to help you manage multiple properties efficiently."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer comprehensive customer support to assist you with any questions or issues you may have."
    }
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {questions.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              {item.question}
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
