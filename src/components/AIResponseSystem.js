import React, { useState, useEffect } from 'react';
import './AIResponseSystem.css';

const AIResponseSystem = () => {
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState('');
  const [escalationRules, setEscalationRules] = useState([]);
  const [learningData, setLearningData] = useState([]);

  useEffect(() => {
    // Fetch initial data from the database
    const fetchData = async () => {
      try {
        const response = await fetch('/api/responses');
        const data = await response.json();
        setResponses(data.responses);
        setEscalationRules(data.escalationRules);
        setLearningData(data.learningData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddResponse = async (e) => {
    e.preventDefault();
    if (!newResponse) return;

    try {
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newResponse }),
      });
      const data = await response.json();
      setResponses([...responses, data]);
      setNewResponse('');
    } catch (error) {
      console.error('Error adding response:', error);
    }
  };

  const handleAddEscalationRule = async (rule) => {
    try {
      const response = await fetch('/api/escalationRules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule),
      });
      const data = await response.json();
      setEscalationRules([...escalationRules, data]);
    } catch (error) {
      console.error('Error adding escalation rule:', error);
    }
  };

  const handleLearningDataUpdate = async (data) => {
    try {
      const response = await fetch('/api/learningData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const updatedData = await response.json();
      setLearningData(updatedData);
    } catch (error) {
      console.error('Error updating learning data:', error);
    }
  };

  return (
    <div className="ai-response-system">
      <h1>AI Response System</h1>
      <form onSubmit={handleAddResponse}>
        <textarea
          placeholder="Enter your response"
          value={newResponse}
          onChange={(e) => setNewResponse(e.target.value)}
          required
        />
        <button type="submit">Add Response</button>
      </form>
      <div className="responses">
        <h2>Responses</h2>
        {responses.map((response, index) => (
          <div key={index} className="response-item">
            <p>{response.content}</p>
          </div>
        ))}
      </div>
      <div className="escalation-rules">
        <h2>Escalation Rules</h2>
        {escalationRules.map((rule, index) => (
          <div key={index} className="rule-item">
            <p>{rule.description}</p>
          </div>
        ))}
      </div>
      <div className="learning-data">
        <h2>Learning Data</h2>
        {learningData.map((data, index) => (
          <div key={index} className="data-item">
            <p>{data.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIResponseSystem;
