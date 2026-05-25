import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '@/components/AdminLayout';
import type { Game, PageProps } from '@/types';

interface Props {
    games: Game[];
}

export default function ManageMatch({ games }: Props) {
    const { flash } = usePage<PageProps>().props;
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Game | null>(null);
    const [form, setForm] = useState({
        tim_home: '',
        tim_away: '',
        tanggal: '',
        lokasi: '',
        harga: '',
    });

    const resetForm = () => {
        setForm({ tim_home: '', tim_away: '', tanggal: '', lokasi: '', harga: '' });
        setEditing(null);
        setShowForm(false);
    };

    const openEdit = (game: Game) => {
        setForm({
            tim_home: game.tim_home,
            tim_away: game.tim_away,
            tanggal: game.tanggal.slice(0, 10),
            lokasi: game.lokasi,
            harga: String(game.harga),
        });
        setEditing(game);
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            router.put(`/admin/matches/${editing.id}`, form, { onSuccess: () => resetForm() });
        } else {
            router.post('/admin/matches', form, { onSuccess: () => resetForm() });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus pertandingan ini?')) {
            router.delete(`/admin/matches/${id}`);
        }
    };

    return (
        <AdminLayout title="Manage Match">
            {flash?.success && (
                <div className="mb-6 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-lg text-sm text-green-400">{flash.success}</div>
            )}

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="px-4 py-2 bg-nba-red rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {showForm ? 'Cancel' : 'Add Match'}
                </button>
            </div>

            {showForm && (
                <div className="bg-card-bg border border-white/5 rounded-xl p-6 mb-6">
                    <h3 className="font-bold mb-4">{editing ? 'Edit Match' : 'New Match'}</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                            <label className="text-xs text-white/50 mb-1 block">Home Team</label>
                            <input type="text" value={form.tim_home} onChange={e => setForm({ ...form, tim_home: e.target.value })} required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-nba-red" />
                        </div>
                        <div>
                            <label className="text-xs text-white/50 mb-1 block">Away Team</label>
                            <input type="text" value={form.tim_away} onChange={e => setForm({ ...form, tim_away: e.target.value })} required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-nba-red" />
                        </div>
                        <div>
                            <label className="text-xs text-white/50 mb-1 block">Date</label>
                            <input type="date" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })} required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-nba-red" />
                        </div>
                        <div>
                            <label className="text-xs text-white/50 mb-1 block">Venue</label>
                            <input type="text" value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })} required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-nba-red" />
                        </div>
                        <div>
                            <label className="text-xs text-white/50 mb-1 block">Price ($)</label>
                            <input type="number" value={form.harga} onChange={e => setForm({ ...form, harga: e.target.value })} required min={0}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-nba-red" />
                        </div>
                        <div className="md:col-span-2 lg:col-span-5 flex gap-3 pt-2">
                            <button type="submit" className="px-5 py-2 bg-nba-red rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                                {editing ? 'Update Match' : 'Create Match'}
                            </button>
                            <button type="button" onClick={resetForm}
                                className="px-5 py-2 border border-white/10 rounded-lg text-sm font-semibold hover:bg-white/5 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-card-bg border border-white/5 rounded-xl overflow-hidden">
                {games.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-white/50 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-4 font-medium">Home</th>
                                <th className="text-left px-6 py-4 font-medium">Away</th>
                                <th className="text-left px-6 py-4 font-medium">Date</th>
                                <th className="text-left px-6 py-4 font-medium">Venue</th>
                                <th className="text-left px-6 py-4 font-medium">Price</th>
                                <th className="text-right px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game) => (
                                <tr key={game.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-semibold">{game.tim_home}</td>
                                    <td className="px-6 py-4 font-semibold">{game.tim_away}</td>
                                    <td className="px-6 py-4 text-white/70">
                                        {new Date(game.tanggal).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 text-white/70">{game.lokasi}</td>
                                    <td className="px-6 py-4 text-nba-red font-semibold">${game.harga}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEdit(game)}
                                                className="px-3 py-1.5 text-xs border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(game.id)}
                                                className="px-3 py-1.5 text-xs border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-4xl font-black italic text-white/10 mb-4">NO MATCHES</p>
                        <p className="text-white/50 mb-6">No matches have been added yet.</p>
                        <button onClick={() => setShowForm(true)}
                            className="px-6 py-3 bg-nba-red rounded-lg font-semibold hover:bg-red-700 transition-colors">Add Match</button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
