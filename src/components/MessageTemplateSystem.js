import React, { useState } from 'react';
import './MessageTemplateSystem.css';

const MessageTemplateSystem = () => {
  const [templates, setTemplates] = useState([]);
  const [newTemplate, setNewTemplate] = useState('');
  const [sequence, setSequence] = useState([]);
  const [dynamicContent, setDynamicContent] = useState('');

  const handleAddTemplate = () => {
    if (!newTemplate) return;
    setTemplates([...templates, newTemplate]);
    setNewTemplate('');
  };

  const handleAddToSequence = (template) => {
    setSequence([...sequence, template]);
  };

  const handleDynamicContentChange = (e) => {
    setDynamicContent(e.target.value);
  };

  return (
    <div className="message-template-system">
      <h1>Message Template System</h1>
      <div className="template-creation">
        <textarea
          placeholder="Enter your message template"
          value={newTemplate}
          onChange={(e) => setNewTemplate(e.target.value)}
          required
        />
        <button onClick={handleAddTemplate}>Add Template</button>
      </div>
      <div className="template-list">
        <h2>Templates</h2>
        {templates.map((template, index) => (
          <div key={index} className="template-item">
            <p>{template}</p>
            <button onClick={() => handleAddToSequence(template)}>Add to Sequence</button>
          </div>
        ))}
      </div>
      <div className="message-sequence">
        <h2>Message Sequence</h2>
        {sequence.map((template, index) => (
          <div key={index} className="sequence-item">
            <p>{template}</p>
          </div>
        ))}
      </div>
      <div className="dynamic-content">
        <h2>Dynamic Content</h2>
        <textarea
          placeholder="Enter dynamic content"
          value={dynamicContent}
          onChange={handleDynamicContentChange}
          required
        />
      </div>
    </div>
  );
};

export default MessageTemplateSystem;
