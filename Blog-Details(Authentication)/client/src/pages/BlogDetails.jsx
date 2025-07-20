import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        content: '',
        tags: [],
        createdAt: ''
    });

    useEffect(() => {
        axios
            .get(`http://localhost:3030/api/blog/detail/${id}`,{
                withCredentials:true
            })
            .then((res) => setBlog(res.data.blog))
            .catch((err) => console.log(err));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            const res = await axios.delete(`http://localhost:3030/api/blog/delete/${id}`,{
                withCredentials:true
            });
            alert(res.data.message);
            navigate("/");
        } catch (error) {
            alert("Error deleting blog");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Card className="border-0 shadow-sm rounded-4">
                        <Card.Img
                            variant="top"
                            src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
                            style={{ objectFit: 'cover', height: '300px' }}
                            alt={blog.title}
                        />
                        <Card.Body className="p-4">
                            <h1 className="fw-bold mb-3">{blog.title}</h1>
                            <div className="text-muted mb-3 small d-flex justify-content-between align-items-center">
                                <span>✍️ By <strong>{blog.author}</strong></span>
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                            <hr />
                            <p className="fs-5" style={{ lineHeight: '1.8' }}>
                                {blog.content}
                            </p>

                            {blog.tags.length > 0 && (
                                <div className="mt-4">
                                    {blog.tags.map((tag, index) => (
                                        <span key={index} className="badge bg-primary me-2 mb-2">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="mt-5 d-flex justify-content-end gap-2">
                                <Link to={`/edit/${blog._id}`} className="btn btn-outline-dark rounded-pill px-4">
                                    ✏️ Edit
                                </Link>
                                <Button variant="outline-danger" className="rounded-pill px-4" onClick={handleDelete}>
                                    🗑️ Delete
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
