import { useState } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/components/DashboardLayout';
import Button from '@/components/Button';
import type { Booking } from '@/types';

interface Props {
    bookings: Booking[];
    total: number;
    totalTiket: number;
}

export default function AdminDashboard({ bookings, total, totalTiket }: Props) {
    const [search, setSearch] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin', { search }, { preserveState: true });
    };

    const handleApprove = (id: number) => {
        router.put(`/admin/status/${id}`);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this booking?')) {
            router.delete(`/admin/delete/${id}`);
        }
    };

    const activeMatches = bookings.filter(b => b.status === 'success').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.jumlah * (b.game?.harga ?? 0)), 0);

    return (
        <DashboardLayout role="admin" title="Admin Control Center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total Revenue</p>
                    <p className="text-3xl font-black italic text-nba-red">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Tickets Sold</p>
                    <p className="text-3xl font-black italic">{totalTiket}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Active Bookings</p>
                    <p className="text-3xl font-black italic text-green-400">{activeMatches}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total Bookings</p>
                    <p className="text-3xl font-black italic">{total}</p>
                </div>
            </div>

            <div className="bg-card-bg border border-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search bookings..."
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-nba-red w-64"
                        />
                        <Button type="submit" size="sm">Search</Button>
                    </form>
                    <span className="text-xs text-white/30">{bookings.length} bookings</span>
                </div>

                {bookings.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-white/50 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-4 font-medium">Customer</th>
                                <th className="text-left px-6 py-4 font-medium">Match</th>
                                <th className="text-left px-6 py-4 font-medium">Tickets</th>
                                <th className="text-left px-6 py-4 font-medium">Payment</th>
                                <th className="text-left px-6 py-4 font-medium">Status</th>
                                <th className="text-right px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-semibold">{booking.nama}</td>
                                    <td className="px-6 py-4 text-white/70">
                                        {booking.game?.tim_home} vs {booking.game?.tim_away}
                                    </td>
                                    <td className="px-6 py-4">{booking.jumlah}</td>
                                    <td className="px-6 py-4">{booking.pembayaran}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                            booking.status === 'success' ? 'bg-green-500/20 text-green-400' :
                                            booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {booking.status === 'pending' && (
                                                <button onClick={() => handleApprove(booking.id)} className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                                                    Approve
                                                </button>
                                            )}
                                            <a href={`/admin/edit/${booking.id}`} className="px-3 py-1.5 text-xs border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                                                Edit
                                            </a>
                                            <button onClick={() => handleDelete(booking.id)} className="px-3 py-1.5 text-xs border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-white/50">No bookings found.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
