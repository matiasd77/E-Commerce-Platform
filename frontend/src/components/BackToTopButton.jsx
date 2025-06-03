import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all focus:outline-none"
      aria-label="Back to top"
    >
      <FaArrowUp className="w-5 h-5" />
    </button>
  ) : null;
};

export default BackToTopButton; 