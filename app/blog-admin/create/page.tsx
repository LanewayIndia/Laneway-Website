'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverPage, setCoverPage] = useState(''); // Added cover page state
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
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          cover_image: coverImage,
          cover_page: coverPage, // Added cover page to payload
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

  async function handlePublish() {
    setSaving(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          cover_image: coverImage,
          cover_page: coverPage, // Added cover page to payload
          content: editor?.getJSON(),
          seo_title: seoTitle,
          seo_description: seoDesc,
          tags: tags.split(',').map(t => t.trim()),
          status: 'published',
        }),
      });

      if (res.ok) {
        setMessage('✅ Blog published successfully!');
        router.push('/blog-admin');
      } else {
        setMessage('❌ Something went wrong.');
      }
    } catch {
      setMessage('❌ Error publishing blog.');
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-gray-800 text-sm">{message}</div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image URL</label>
            <input
              type="text"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            />
          </div>

          {/* Added Cover Page field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Page URL</label>
            <input
              type="text"
              value={coverPage}
              onChange={e => setCoverPage(e.target.value)}
              placeholder="https://... (optional cover page)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="AI, Marketing, Startup"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">SEO Title</label>
            <input
              type="text"
              value={seoTitle}
              onChange={e => setSeoTitle(e.target.value)}
              placeholder="SEO optimized title"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">SEO Description</label>
            <textarea
              value={seoDesc}
              onChange={e => setSeoDesc(e.target.value)}
              placeholder="Brief description for search engines"
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 min-h-64 text-white prose prose-invert max-w-none">
              <EditorContent editor={editor} />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-lg font-medium transition-colors"
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={handlePublish}
              disabled={saving}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black rounded-lg font-medium transition-colors"
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
            <button
              onClick={() => router.push('/blog-admin')}
              className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-400 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}