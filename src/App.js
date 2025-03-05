import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function App() {
  const [people, setPeople] = useState([
    { name: 'Meghana', favoriteFood: 'Tiramisu', favoriteColor: 'Blue' },
    { name: 'Spurthi', favoriteFood: 'Rasmalai', favoriteColor: 'Green' },
  ]);

  const [formData, setFormData] = useState({ name: '', favoriteFood: '', favoriteColor: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const favoriteFood = formData.favoriteFood.trim();
    const favoriteColor = formData.favoriteColor.trim();

    const textRegex = /^[A-Za-z\s]+$/;
    const colorRegex = /^(#[0-9A-Fa-f]{3,6}|[A-Za-z\s]+)$/;

    if (!name || !favoriteFood || !favoriteColor) {
      alert('All fields are required!');
      return;
    }
    if (!textRegex.test(name) || !textRegex.test(favoriteFood)) {
      alert('Name and Favorite Food should only contain letters.');
      return;
    }
    if (!colorRegex.test(favoriteColor)) {
      alert('Favorite Color should be a valid name or hex code.');
      return;
    }

    if (editingIndex !== null) {
      const updatedPeople = [...people];
      updatedPeople[editingIndex] = { name, favoriteFood, favoriteColor };
      
      setPeople(updatedPeople);
      setEditingIndex(null);
    } else {
      
      setPeople([...people, { name, favoriteFood, favoriteColor }]);
    }
    setFormData({ name: '', favoriteFood: '', favoriteColor: '' });
  };

  const handleDelete = (index) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setFormData(people[index]);
    setEditingIndex(index);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">My Classmates</h1>
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
          <Button type="submit" variant="primary">{editingIndex !== null ? 'Update' : 'Add'}</Button>
          {editingIndex !== null && (
            <Button variant="secondary" onClick={() => { setEditingIndex(null); setFormData({ name: '', favoriteFood: '', favoriteColor: '' }); }}>Cancel</Button>
          )}
        </Stack>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Favorite Food</th>
            <th>Favorite Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.favoriteFood}</td>
              <td>{person.favoriteColor}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(index)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;