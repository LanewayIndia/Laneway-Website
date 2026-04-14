'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateBlogPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
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

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) router.push('/login');
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.push('/login');
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSaveDraft() {
    if (!session) {
      router.push('/login');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Pass Supabase JWT so the backend can verify it
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title,
          cover_image: coverImage,
          content: editor?.getJSON(),
          seo_title: seoTitle,
          seo_description: seoDesc,
          tags: tags.split(',').map(t => t.trim()),
        }),
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (res.ok) setMessage('✅ Draft saved successfully!');
      else setMessage('❌ Something went wrong.');
    } catch {
      setMessage('❌ Error saving draft.');
    }
    setSaving(false);
  }