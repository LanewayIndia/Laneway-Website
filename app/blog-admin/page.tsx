'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/blogs');
    const data = await res.json();
    setBlogs(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function handlePublish(id: string, currentStatus: string) {
    const endpoint = currentStatus === 'published' ? 'unpublish' : 'publish';
    await fetch(`http://localhost:5000/api/blogs/${id}/${endpoint}`, {
      method: 'PATCH',
    });
    fetchBlogs();
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: 'DELETE',
    });
    fetchBlogs();
  }

  return (
    <div style={{ background: '#F5F7F3', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#AE772A', width: '8px', height: '40px', borderRadius: '4px' }} />
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#000', margin: 0 }}>Blog Posts</h1>
          </div>
          <Link href="/blog-admin/create">
            <button style={{
              background: '#AE772A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              + New Blog
            </button>
          </Link>
        </div>

        {/* Blog List */}
        {loading ? (
          <p style={{ color: '#666' }}>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p style={{ color: '#666' }}>No blogs yet. Create your first one!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {blogs.map((blog: any) => (
              <div key={blog.id} style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '20px 24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h2 style={{ fontSize: '17px', fontWeight: '600', color: '#000', margin: '0 0 6px 0' }}>
                    {blog.title}
                  </h2>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{
                      background: blog.status === 'published' ? '#e6f4ea' : '#fff8e6',
                      color: blog.status === 'published' ? '#2d7a3a' : '#AE772A',
                      padding: '2px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link href={`/blog-admin/edit/${blog.id}`}>
                  <button style={{
  background: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '13px',
  cursor: 'pointer',
  fontWeight: '500'
}}>
  Edit
</button>
                  </Link>

                  <button
                    onClick={() => handlePublish(blog.id, blog.status)}
                    style={{
                      background: blog.status === 'published' ? '#fff8e6' : '#e6f4ea',
                      color: blog.status === 'published' ? '#AE772A' : '#2d7a3a',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}>
                    {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    onClick={() => handleDelete(blog.id)}
                    style={{
                      background: '#fdecea',
                      color: '#c0392b',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}