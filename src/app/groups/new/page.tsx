'use client'

import { useState } from 'react';

export default function NewGroupPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [creatorUserId, setCreatorUserId] = useState('demo-user-1');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const res = await fetch('/api/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, creatorUserId }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.error || 'Request failed');
            setResult(json);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Create a Group</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm">Name</label>
                    <input className="w-full border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm">Description</label>
                    <textarea className="w-full border rounded px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm">Creator User ID</label>
                    <input className="w-full border rounded px-3 py-2" value={creatorUserId} onChange={(e) => setCreatorUserId(e.target.value)} required />
                </div>
                <button disabled={loading} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">
                    {loading ? 'Creating...' : 'Create Group'}
                </button>
            </form>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {result && (
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            )}
        </div>
    );
}


