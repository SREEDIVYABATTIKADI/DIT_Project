import React, { useState, useEffect } from 'react';
// import axiosClient from '../axios-client';
import axios from 'axios'; // Import axios

import './studentHomePage.css';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotices = async (page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/getNotice?page=${page}`);
      const { data, meta } = response.data;
      setNotices(data.data);
      setTotalPages(data.last_page);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchNotices(newPage);
  };

  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  return (
    <div className="notice-board">
      <h2>Notice Board</h2>
      <ul className="notice-list">
        {notices.map((notice) => (
          <li key={notice.description} className="notice-item">
            <a
              href={notice.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>{notice.description}</strong> </a>{notice.date}
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
