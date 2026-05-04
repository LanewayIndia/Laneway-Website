// Redirect to main jobs admin
import { redirect } from 'next/navigation';

export default function AdminJobsPage() {
  redirect('/jobs');
}

