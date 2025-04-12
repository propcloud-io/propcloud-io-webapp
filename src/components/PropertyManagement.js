import React, { useState, useEffect } from 'react';
import './PropertyManagement.css';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    name: '',
    address: '',
    amenities: '',
  });
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    // Fetch properties from the database
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleAddProperty = async (e) => {
    e.preventDefault();
    if (!newProperty.name || !newProperty.address) return;

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProperty),
      });
      const data = await response.json();
      setProperties([...properties, data]);
      setNewProperty({ name: '', address: '', amenities: '' });
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
  };

  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return;

    try {
      const response = await fetch(`/api/properties/${selectedProperty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProperty),
      });
      const data = await response.json();
      setProperties(properties.map(prop => (prop.id === selectedProperty.id ? data : prop)));
      setSelectedProperty(null);
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <div className="property-management">
      <h1>Property Management</h1>
      <form onSubmit={handleAddProperty}>
        <input
          type="text"
          placeholder="Property Name"
          value={newProperty.name}
          onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Property Address"
          value={newProperty.address}
          onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Amenities"
          value={newProperty.amenities}
          onChange={(e) => setNewProperty({ ...newProperty, amenities: e.target.value })}
        />
        <button type="submit">Add Property</button>
      </form>
      <div className="property-list">
        <h2>Properties</h2>
        <ul>
          {properties.map((property) => (
            <li key={property.id} onClick={() => handleSelectProperty(property)}>
              {property.name} - {property.address}
            </li>
          ))}
        </ul>
      </div>
      {selectedProperty && (
        <form onSubmit={handleUpdateProperty}>
          <h2>Edit Property</h2>
          <input
            type="text"
            placeholder="Property Name"
            value={selectedProperty.name}
            onChange={(e) => setSelectedProperty({ ...selectedProperty, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Property Address"
            value={selectedProperty.address}
            onChange={(e) => setSelectedProperty({ ...selectedProperty, address: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Amenities"
            value={selectedProperty.amenities}
            onChange={(e) => setSelectedProperty({ ...selectedProperty, amenities: e.target.value })}
          />
          <button type="submit">Update Property</button>
        </form>
      )}
    </div>
  );
};

export default PropertyManagement;
