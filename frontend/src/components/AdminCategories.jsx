import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories';

const initialForm = { name: '', description: '' };

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);

  const fetchCategories = () => {
    setLoading(true);
    getCategories()
      .then(res => {
        setCategories(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load categories');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
      fetchCategories();
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setForm({
      name: category.name,
      description: category.description || '',
    });
    setFormError(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setFormError(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!form.name) {
      setFormError('Name is required.');
      return;
    }
    try {
      if (editingId) {
        await updateCategory(editingId, form);
      } else {
        await createCategory(form);
      }
      fetchCategories();
      setForm(initialForm);
      setEditingId(null);
    } catch (err) {
      setFormError('Failed to save category.');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded mb-6 flex flex-col gap-2 max-w-xl">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="border rounded px-3 py-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded px-3 py-2"
        />
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            {editingId ? 'Update Category' : 'Add Category'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          )}
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full text-left bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id} className="border-t">
              <td className="py-2 px-4">{category.name}</td>
              <td className="py-2 px-4">{category.description}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-500 hover:underline mr-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories; 