'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: '<p>Start writing your blog here...</p>',
  });

  async function handleSaveDraft() {
    setSaving(true);
    try {
      const res = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
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
      if (res.ok) setMessage('✅ Draft saved successfully!');
      else setMessage('❌ Something went wrong.');
    } catch {
      setMessage('❌ Error saving draft.');
    }
    setSaving(false);
  }

  return (
    <div style={{ background: '#F5F7F3', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            background: '#AE772A',
            width: '8px',
            height: '40px',
            borderRadius: '4px'
          }} />
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#000000', margin: 0 }}>
            Create New Blog
          </h1>
        </div>

        {message && (
          <div style={{
            background: message.includes('✅') ? '#e6f4ea' : '#fdecea',
            border: `1px solid ${message.includes('✅') ? '#a8d5b5' : '#f5c6cb'}`,
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#000'
          }}>
            {message}
          </div>
        )}

        {/* Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}>

          {/* Title */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Title
            </label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter blog title"
              style={{
                width: '100%',
                border: '1.5px solid #DBDDDC',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#000'
              }}
            />
          </div>

          {/* Cover Image */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Cover Image URL
            </label>
            <input
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="https://..."
              style={{
                width: '100%',
                border: '1.5px solid #DBDDDC',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#000'
              }}
            />
          </div>

          {/* Content Editor */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Content
            </label>
            <div style={{
              border: '1.5px solid #DBDDDC',
              borderRadius: '8px',
              padding: '12px 14px',
              minHeight: '250px',
              background: '#fff',
              fontSize: '15px',
              color: '#000'
            }}>
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* SEO Title */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              SEO Title
            </label>
            <input
              value={seoTitle}
              onChange={e => setSeoTitle(e.target.value)}
              placeholder="SEO title"
              style={{
                width: '100%',
                border: '1.5px solid #DBDDDC',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#000'
              }}
            />
          </div>

          {/* SEO Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              SEO Description
            </label>
            <textarea
              value={seoDesc}
              onChange={e => setSeoDesc(e.target.value)}
              placeholder="SEO description"
              rows={3}
              style={{
                width: '100%',
                border: '1.5px solid #DBDDDC',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#000',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#AE772A', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Tags (comma separated)
            </label>
            <input
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="ai, business, tech"
              style={{
                width: '100%',
                border: '1.5px solid #DBDDDC',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                color: '#000'
              }}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            style={{
              background: saving ? '#DBDDDC' : '#AE772A',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 32px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>

        </div>
      </div>
    </div>
  );
}