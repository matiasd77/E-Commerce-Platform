import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    } else if (showEdit) {
      setEditForm({ firstName: user.firstName, lastName: user.lastName, email: user.email });
      setSuccess(false);
      setError('');
    }
  }, [user, navigate, showEdit]);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateUserProfile(editForm);
      setSuccess(true);
      setTimeout(() => {
        setShowEdit(false);
      }, 1200);
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-100 flex flex-col items-center justify-center py-16">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full flex flex-col items-center relative">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-700 mb-4">
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{user.firstName} {user.lastName}</h2>
        <p className="text-gray-500 mb-2">{user.email}</p>
        <span className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-xs mb-4">{user.role}</span>
        <button
          className="absolute top-6 right-6 px-4 py-1 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition text-sm font-semibold"
          onClick={() => setShowEdit(true)}
        >
          Edit
        </button>
        <div className="w-full border-t border-gray-200 mt-4 pt-4 text-center">
          <p className="text-gray-600">Welcome to your profile page! Here you can view your account details.</p>
        </div>
      </div>
      {/* Order History Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full mt-12">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Order History</h3>
        <div className="text-gray-500 text-center py-8 text-lg font-medium">No orders completed yet.</div>
      </div>
      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="firstName"
                value={editForm.firstName}
                onChange={handleEditChange}
                placeholder="First Name"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="text"
                name="lastName"
                value={editForm.lastName}
                onChange={handleEditChange}
                placeholder="Last Name"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">Profile updated!</div>}
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => setShowEdit(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage; 