import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable } from '@tanstack/react-table';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function App() {
  const [people, setPeople] = useState([
    { name: 'Meghana', favoriteFood: 'Tiramisu', favoriteColor: 'Blue' },
    { name: 'Spurthi', favoriteFood: 'Rasmalai', favoriteColor: 'Green' },
  ]);

  const [formData, setFormData] = useState({ name: '', favoriteFood: '', favoriteColor: '' });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.favoriteFood || !formData.favoriteColor) {
      alert('All fields are required!');
      return;
    }
    setPeople([...people, formData]);
    setFormData({ name: '', favoriteFood: '', favoriteColor: '' });
  };

  // Handle delete action
  const handleDelete = (name) => {
    setPeople(people.filter((person) => person.name !== name));
  };

  // Define table columns
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Favorite Food', accessor: 'favoriteFood' },
    { Header: 'Favorite Color', accessor: 'favoriteColor' },
    { Header: 'Actions', accessor: 'actions' },
  ];

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">My Classmates</h1>

      {/* Form to add new profiles */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Form.Control
            type="text"
            placeholder="Favorite Food"
            value={formData.favoriteFood}
            onChange={(e) => setFormData({ ...formData, favoriteFood: e.target.value })}
          />
          <Form.Control
            type="text"
            placeholder="Favorite Color"
            value={formData.favoriteColor}
            onChange={(e) => setFormData({ ...formData, favoriteColor: e.target.value })}
          />
          <Button type="submit" variant="primary">Add</Button>
        </Stack>
      </Form>

      {/* Table View */}
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.favoriteFood}</td>
              <td>{person.favoriteColor}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(person.name)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
