'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useParams, useRouter } from 'next/navigation';

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: '',
  });

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
      const blog = await res.json();
      setTitle(blog.title || '');
      setCoverImage(blog.cover_image || '');
      setTags((blog.tags || []).join(', '));
      setSeoTitle(blog.seo_title || '');
      setSeoDesc(blog.seo_description || '');
      if (editor && blog.content) {
        if (typeof blog.content === 'object') {
          editor.commands.setContent(blog.content);
        } else {
          editor.commands.setContent(blog.content);
        }
      }
      setLoading(false);
    }
    if (id) fetchBlog();
  }, [id, editor]);

  async function handleUpdate() {
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          cover_image: coverImage,
          content: editor?.getJSON(),
          seo_title: seoTitle,
          seo_description: seoDesc,
          tags: tags.split(',').map(t => t.trim()),
        }),
      });
      if (res.ok) {
        setMessage('✅ Blog updated successfully!');
        setTimeout(() => router.push('/blog-admin'), 1500);
      } else {
        setMessage('❌ Something went wrong.');
      }
    } catch {
      setMessage('❌ Error updating blog.');
    }
    setSaving(false);
  }

  if (loading) return <div style={{ padding: '40px', color: '#666' }}>Loading blog...</div>;

  return (
    <div style={{ background: '#F5F7F3', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ background: '#AE772A', width: '8px', height: '40px', borderRadius: '4px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#000', margin: 0 }}>Edit Blog</h1>
        </div>

        {message && (
          <div style={{
            background: message.includes('✅') ? '#e6f4ea' : '#fdecea',
            border: `1px solid ${message.includes('✅') ? '#a8d5b5' : '#f5c6cb'}`,
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '14px',
          }}>
            {message}
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter blog title"
              style={{ width: '100%', border: '1.5px solid #DBDDDC', borderRadius: '8px', padding: '10px 14px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', color: '#000' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cover Image URL</label>
            <input value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="https://..."
              style={{ width: '100%', border: '1.5px solid #DBDDDC', borderRadius: '8px', padding: '10px 14px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', color: '#000' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Content</label>
            <div style={{ border: '1.5px solid #DBDDDC', borderRadius: '8px', padding: '12px 14px', minHeight: '250px', background: '#fff', fontSize: '15px', color: '#000' }}>
              <EditorContent editor={editor} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SEO Title</label>
            <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder="SEO title"
              style={{ width: '100%', border: '1.5px solid #DBDDDC', borderRadius: '8px', padding: '10px 14px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', color: '#000' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SEO Description</label>
            <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} placeholder="SEO description" rows={3}
              style={{ width: '100%', border: '1.5px solid #DBDDDC', borderRadius: '8px', padding: '10px 14px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', color: '#000', resize: 'vertical' }} />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tags (comma separated)</label>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="ai, business, tech"
              style={{ width: '100%', border: '1.5px solid #DBDDDC', borderRadius: '8px', padding: '10px 14px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', color: '#000' }} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleUpdate} disabled={saving}
              style={{ background: saving ? '#DBDDDC' : '#AE772A', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 32px', fontSize: '15px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Saving...' : 'Update Blog'}
            </button>
            <button onClick={() => router.push('/blog-admin')}
              style={{ background: '#f5f5f5', color: '#000', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}