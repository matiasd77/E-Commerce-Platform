import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder, updateOrderStatus } from '../api/orders';
import { useAuth } from '../auth/AuthContext';

const statusOptions = [
  'PENDING',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrder = () => {
    setLoading(true);
    getOrder(orderId)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load order');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line
  }, [orderId]);

  const handleStatusChange = async (status) => {
    setUpdating(true);
    try {
      await updateOrderStatus(orderId, status);
      fetchOrder();
    } catch {
      alert('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="container mx-auto py-8">Loading...</div>;
  if (error) return <div className="container mx-auto py-8 text-red-500">{error}</div>;
  if (!order) return null;

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>
      <div className="mb-4">
        <div><span className="font-semibold">Status:</span> {order.status}</div>
        <div><span className="font-semibold">Total:</span> ${order.totalAmount}</div>
        <div><span className="font-semibold">Shipping Address:</span> {order.shippingAddress}</div>
        <div><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</div>
        <div><span className="font-semibold">Payment Status:</span> {order.paymentStatus}</div>
        {user && user.role === 'ADMIN' && (
          <div className="mt-2">
            <label className="font-semibold mr-2">Update Status:</label>
            <select
              value={order.status}
              onChange={e => handleStatusChange(e.target.value)}
              disabled={updating}
              className="border rounded px-2 py-1"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold mb-2">Items</h3>
      <table className="w-full text-left bg-white shadow rounded mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map(item => (
            <tr key={item.id} className="border-t">
              <td className="py-2 px-4">{item.product?.name}</td>
              <td className="py-2 px-4">{item.quantity}</td>
              <td className="py-2 px-4">${item.price}</td>
              <td className="py-2 px-4">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailsPage; 