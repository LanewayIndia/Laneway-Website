'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  status: 'draft' | 'published';
  created_at: string;
  [key: string]: any;
}

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState<Record<string, boolean>>({});
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/blogs`);
      if (!res.ok) {
        console.error(`Failed to fetch blogs: ${res.status}`);
        setBlogs([]);
        return;
      }
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish(id: string, currentStatus: string) {
    setIsPublishing(prev => ({ ...prev, [id]: true }));
    setError(null);
    try {
      const endpoint = currentStatus === 'published' ? 'unpublish' : 'publish';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/blogs/${id}/${endpoint}`, {
        method: 'PATCH',
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || 'Failed to update blog status');
        return;
      }
      await fetchBlogs();
    } catch (err) {
      console.error(err);
      setError('Network error occurred while updating status');
    } finally {
      setIsPublishing(prev => ({ ...prev, [id]: false }));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    setIsDeleting(prev => ({ ...prev, [id]: true }));
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/blogs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || 'Failed to delete blog');
        return;
      }
      await fetchBlogs();
    } catch (err) {
      console.error(err);
      setError('Network error occurred while deleting blog');
    } finally {
      setIsDeleting(prev => ({ ...prev, [id]: false }));
    }
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

        {error && (
          <div style={{ marginBottom: '24px', padding: '12px 16px', background: '#fdecea', border: '1px solid #f5c6cb', borderRadius: '8px', color: '#c0392b', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {/* Blog List */}
        {loading ? (
          <p style={{ color: '#666' }}>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p style={{ color: '#666' }}>No blogs yet. Create your first one!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {blogs.map((blog: Blog) => (
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
                    disabled={isPublishing[blog.id] || isDeleting[blog.id]}
                    onClick={() => handlePublish(blog.id, blog.status)}
                    style={{
                      background: blog.status === 'published' ? '#fff8e6' : '#e6f4ea',
                      color: blog.status === 'published' ? '#AE772A' : '#2d7a3a',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      cursor: (isPublishing[blog.id] || isDeleting[blog.id]) ? 'not-allowed' : 'pointer',
                      fontWeight: '500',
                      opacity: isPublishing[blog.id] ? 0.6 : 1
                    }}>
                    {isPublishing[blog.id] ? 'Updating...' : blog.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    disabled={isPublishing[blog.id] || isDeleting[blog.id]}
                    onClick={() => handleDelete(blog.id)}
                    style={{
                      background: '#fdecea',
                      color: '#c0392b',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      cursor: (isPublishing[blog.id] || isDeleting[blog.id]) ? 'not-allowed' : 'pointer',
                      fontWeight: '500',
                      opacity: isDeleting[blog.id] ? 0.6 : 1
                    }}>
                    {isDeleting[blog.id] ? 'Deleting...' : 'Delete'}
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