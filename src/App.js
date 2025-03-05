import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function App() {
  
  document.title = "Student Connect";
  const [people, setPeople] = useState([
    { name: 'Meghana', favoriteFood: 'Tiramisu', favoriteColor: 'Blue' },
    { name: 'Spurthi', favoriteFood: 'Rasmalai', favoriteColor: 'Green' },
  ]);
  const [formData, setFormData] = useState({ name: '', favoriteFood: '', favoriteColor: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = [
    { accessorKey: 'name', header: "Name" },
    { accessorKey: 'favoriteFood', header: 'Favorite Food' },
    { accessorKey: 'favoriteColor', header: 'Favorite Color' },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <>
          <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(row.index)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row.index)}>Delete</Button>
        </>
      ),
      // Disable sorting on the actions column
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: people,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const favoriteFood = formData.favoriteFood.trim();
    const favoriteColor = formData.favoriteColor.trim();

    const textRegex = /^[A-Za-z\s]+$/;

    if (!name || !favoriteFood || !favoriteColor) {
      alert('All fields are required!');
      return;
    }

    if (!textRegex.test(name)) {
      alert('Name should only contain letters.');
      return;
    }

    if (!textRegex.test(favoriteFood)) {
      alert('Favorite Food should only contain letters.');
      return;
    }

    if (!textRegex.test(favoriteColor)) {
      alert('Favorite Color should be a valid name');
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
            disabled={editingIndex !== null}
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

      <Form.Control
        type="text"
        placeholder="Search profiles..."
        className="mb-3"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} 
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {/* Render sorting icon only if sorting is enabled */}
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
