import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct, uploadProductImage } from '../api/products';

const initialForm = { name: '', price: '', description: '', stock: '', imageUrl: '' };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    getProducts()
      .then(res => {
        setProducts(res.data.content || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      imageUrl: product.imageUrl || '',
    });
    setImageFile(null);
    setFormError(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setImageFile(null);
    setFormError(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const res = await uploadProductImage(file);
      setForm({ ...form, imageUrl: res.data });
      setImageFile(file);
    } catch {
      setFormError('Image upload failed');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!form.name || !form.price || !form.description || !form.stock) {
      setFormError('All fields are required.');
      return;
    }
    try {
      if (editingId) {
        await updateProduct(editingId, { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) });
      } else {
        await createProduct({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) });
      }
      fetchProducts();
      setForm(initialForm);
      setEditingId(null);
      setImageFile(null);
    } catch (err) {
      setFormError('Failed to save product.');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Products</h3>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded mb-6 flex flex-col gap-2 max-w-xl">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border rounded px-3 py-2"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          step="0.01"
          className="border rounded px-3 py-2"
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="border rounded px-3 py-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded px-3 py-2"
        />
        <div>
          <label className="block mb-1">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageUploading && <span className="text-sm text-gray-500 ml-2">Uploading...</span>}
          {form.imageUrl && (
            <img src={form.imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            {editingId ? 'Update Product' : 'Add Product'}
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
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t">
              <td className="py-2 px-4">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
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

export default AdminProducts; 