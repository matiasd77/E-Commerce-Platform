import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../api/orders';

const statusOptions = [
  'PENDING',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = () => {
    setLoading(true);
    getAllOrders()
      .then(res => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load orders');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders();
    } catch {
      alert('Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Orders</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full text-left bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4">Order ID</th>
            <th className="py-2 px-4">User</th>
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-t">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.user?.firstName} {order.user?.lastName}</td>
              <td className="py-2 px-4">${order.totalAmount}</td>
              <td className="py-2 px-4">{order.status}</td>
              <td className="py-2 px-4">
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                  disabled={updatingId === order.id}
                  className="border rounded px-2 py-1"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders; 