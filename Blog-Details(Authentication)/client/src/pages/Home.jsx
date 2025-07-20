import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3030/api/blog/getpost')
      .then(res => setBlogs(res.data.blog))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-center text-primary">📰 Latest Blog Posts</h2>
      <div className="row g-4">
        {blogs.map(blog => (
          <div key={blog._id} className="col-md-6 col-lg-4">
            <div 
              className="card blog-card border-0 shadow-sm h-100"
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZyUyMGJsb2d8ZW58MHx8MHx8fDA%3D"
                alt={blog.title}
                className="card-img-top"
                style={{ objectFit: 'cover', height: '250px' }}
              />
              <div className="card-body d-flex flex-column">
                {blog.tags.length > 0 && (
                  <div className="mt-3 mb-2">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="badge rounded-pill bg-light text-dark me-2 mb-2" style={{ fontSize: '0.8rem', border: '1px solid #ddd' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <h5 className="card-title fw-bold mb-2">{blog.title}</h5>
                <p className="card-text text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                  {blog.content.length > 100
                    ? blog.content.substring(0, 100) + '...'
                    : blog.content}
                </p>
                <div className="d-flex justify-content-between text-muted small mt-auto">
                  <span>{new Date(blog.createdAt).toDateString()}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold text-secondary">By {blog.author}</span>
                  <Link 
                    to={`/detail/${blog._id}`} 
                    className="btn btn-primary btn-sm rounded-pill"
                    style={{ transition: 'background 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#0d6efd'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                    Read More
                  </Link>
                </div>
              </div>
              <div className="card-footer bg-white border-0 d-flex justify-content-between px-3 pb-3 pt-0">
                <div className="d-flex gap-3 text-muted small">
                  <i className="bi bi-heart"> 256</i>
                  <i className="bi bi-chat"> 18</i>
                  <i className="bi bi-share"> 12</i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
