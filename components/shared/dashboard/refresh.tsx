'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function RefreshButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function Refresh() {
    setLoading(true);
    try {
      await fetch('/api/revalidate?path=/dashboard'); // Call API route
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }

  return (
    <>
      <Button onClick={Refresh} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Data'}
      </Button>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Refreshing data...</p>
          </div>
        </div>
      )}
    </>
  );
}
