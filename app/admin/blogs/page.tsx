// Redirect to main blogs admin
import { redirect } from 'next/navigation';

export default function AdminBlogsPage() {
  redirect('/blog-admin');
}

