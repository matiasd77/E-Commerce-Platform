import React, { useState } from 'react';
import { FaQuestionCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const HelpSupport = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'My Orders' section. Each order has a tracking number that you can use to monitor its status."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Please visit our Returns page for more details."
    },
    {
      question: "How can I change or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it. Please contact our customer service team immediately for assistance."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are secure and encrypted."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setFormError('Please fill in all fields.');
      return;
    }
    // Email format validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormSuccess(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Help & Support</h1>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <FaEnvelope className="text-blue-600 w-6 h-6 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">support@ecommerce.com</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-blue-600 w-6 h-6 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-800">1-800-123-4567</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-600 w-6 h-6 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-800">123 Commerce St, City, State</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-gray-800 font-medium">{faq.question}</span>
                {openFaq === index ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              {openFaq === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/shipping" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <FaQuestionCircle className="text-blue-600 w-5 h-5 mr-3" />
            <span className="text-gray-800">Shipping Information</span>
          </a>
          <a href="/returns" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <FaQuestionCircle className="text-blue-600 w-5 h-5 mr-3" />
            <span className="text-gray-800">Returns & Refunds</span>
          </a>
          <a href="/privacy" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <FaQuestionCircle className="text-blue-600 w-5 h-5 mr-3" />
            <span className="text-gray-800">Privacy Policy</span>
          </a>
          <a href="/terms" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <FaQuestionCircle className="text-blue-600 w-5 h-5 mr-3" />
            <span className="text-gray-800">Terms of Service</span>
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Form</h2>
        {formSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Thank you for contacting us! We will get back to you soon.</div>
        )}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              rows={4}
              required
            />
          </div>
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpSupport; 