import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    content: '',
    tags: ''
  });

  // ✅ Fetch blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/api/blog/${id}`, {
          withCredentials: true, // send cookie if backend requires
        });
        const { title, author, content, tags } = res.data.blog;
        setForm({
          title,
          author,
          content,
          tags: tags.join(', ')
        });
      } catch (err) {
        console.error('Error loading blog:', err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Main Fix: Add `withCredentials: true` to include JWT
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3030/api/blog/update/${id}`,
        {
          ...form,
          tags: form.tags.split(',').map(tag => tag.trim())
        },
        {
          withCredentials: true // ✅ SEND COOKIE to server
        }
      );
      alert('Blog updated successfully');
      navigate('/');
    } catch (err) {
      console.error('Error updating blog:', err);
      alert(err?.response?.data?.message || "Unauthorized or error updating blog");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm rounded-4 p-4 mx-auto" style={{ maxWidth: '700px' }}>
        <h2 className="mb-4 text-center">✏️ Edit Blog</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              name="author"
              className="form-control"
              value={form.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              className="form-control"
              rows="6"
              value={form.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label">Tags</label>
            <input
              name="tags"
              className="form-control"
              value={form.tags}
              onChange={handleChange}
            />
            <div className="form-text">Separate tags with commas (,)</div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success px-4 rounded-pill shadow-sm">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
