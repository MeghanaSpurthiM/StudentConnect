import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaSort, FaSortUp, FaSortDown, FaThumbsUp } from "react-icons/fa";

function App() {

  document.title = "Student Connect"; // Set the document title

  // People array to render the contents in the table
  const [people, setPeople] = useState([
    { name: 'Meghana', favoriteFood: 'Tiramisu', favoriteColor: 'Blue', likes: 0 },
    { name: 'Spurthi', favoriteFood: 'Rasmalai', favoriteColor: 'Green', likes: 0 },
  ]);

  // Form data state for adding/editing people
  const [formData, setFormData] = useState({ name: '', favoriteFood: '', favoriteColor: '' });

  // State to track which person is being edited, and for global search filter
  const [editingIndex, setEditingIndex] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');

  // Column configuration for the table
  const columns = [
    { accessorKey: 'name', header: "Name" },
    { accessorKey: 'favoriteFood', header: 'Favorite Food' },
    { accessorKey: 'favoriteColor', header: 'Favorite Color' },
    {
      // Column for Likes with button to increment likes
      accessorKey: 'likes',
      header: 'Likes',
      cell: ({ row }) => (
        <Button 
          variant="outline-primary" 
          size="sm" 
          onClick={() => handleLike(row.index)} // Event Handling for the like button
        >
          <FaThumbsUp /> {row.original.likes}
        </Button>
      ),
    },
    {
      // Actions column with Edit and Delete buttons
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <>
          <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(row.index)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row.index)}>Delete</Button>
        </>
      ),
      enableSorting: false, // Disable sorting on this column
    },
  ];

  // Initialize the table with data and columns
  const table = useReactTable({
    data: people,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter, // Update the global filter state when search text changes
  });

  // Handle form submission for adding or editing a person
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, favoriteFood, favoriteColor } = formData;

    const textRegex = /^[A-Za-z\s]+$/;

    // Input validation - Empty fields are not accepted
    if (!name || !favoriteFood || !favoriteColor) {
      alert('All fields are required!');
      return;
    }

    // Input validation - Digits are not accepted for name
    if (!textRegex.test(name)) {
      alert('Name should only contain letters.');
      return;
    }

    // Input validation - Digits are not accepted for favorite food
    if (!textRegex.test(favoriteFood)) {
      alert('Favorite Food should only contain letters.');
      return;
    }

    // Input validation - Digits are not accepted for favorite color
    if (!textRegex.test(favoriteColor)) {
      alert('Favorite Color should be a valid name');
      return;
    }

    // If editing an existing person, update their data
    if (editingIndex !== null) {
      const updatedPeople = [...people];
      updatedPeople[editingIndex] = { name, favoriteFood, favoriteColor, likes: people[editingIndex].likes };
      setPeople(updatedPeople);
      setEditingIndex(null); // Clear the editing index
    } else {
      // If adding a new person, add them to the list
      setPeople([...people, { name, favoriteFood, favoriteColor, likes: 0 }]);
    }
    // Reset the form data after submission
    setFormData({ name: '', favoriteFood: '', favoriteColor: '' });
  };

  // Delete a person from the list
  const handleDelete = (index) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  // Set the form data to the person's details when editing
  const handleEdit = (index) => {
    setFormData(people[index]);
    setEditingIndex(index);
  };

  // Increment the likes count for a person
  const handleLike = (index) => {
    const updatedPeople = [...people];
    updatedPeople[index].likes += 1; // Increment likes count
    setPeople(updatedPeople);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Student Connect</h1>

      {/* Form for adding or editing a person */}
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

      {/* Global search/filter input */}
      <Form.Control
        type="text"
        placeholder="Search profiles..."
        className="mb-3"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)} // Update filter value
      />

      {/* Table displaying the list of people */}
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} 
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {/* Render sorting icons */}
                  {header.column.getCanSort() && (
                    header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'asc' ? <FaSortUp /> : <FaSortDown />
                    ) : (
                      <FaSort />
                    )
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
