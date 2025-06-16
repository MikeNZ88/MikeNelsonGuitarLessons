import { redirect } from 'next/navigation';

export default function ScaleExplorerPage() {
  // Server-side redirect to the standalone Scale Explorer
  redirect('/scale-explorer/');
} 