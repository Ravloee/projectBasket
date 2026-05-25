import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '@/components/AdminLayout';
import type { Booking, PageProps } from '@/types';

interface Props {
    bookings: Booking[];
}

export default function BookingData({ bookings }: Props) {
    const { flash } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/bookings', { search }, { preserveState: true });
    };

    const handleApprove = (id: number) => {
        if (confirm('Approve this booking?')) {
            router.put(`/admin/bookings/${id}/approve`);
        }
    };

    const handleCancel = (id: number) => {
        if (confirm('Cancel this booking?')) {
            router.put(`/admin/bookings/${id}/cancel`);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus booking ini?')) {
            router.delete(`/admin/bookings/${id}`);
        }
    };

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.jumlah * (b.game?.harga ?? 0)), 0);
    const totalTickets = bookings.reduce((s, b) => s + b.jumlah, 0);

    return (
        <AdminLayout title="Booking Data">
            {flash?.success && (
                <div className="mb-6 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-lg text-sm text-green-400">{flash.success}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-card-bg border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total Bookings</p>
                    <p className="text-2xl font-black italic">{bookings.length}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total Revenue</p>
                    <p className="text-2xl font-black italic text-nba-red">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total Tickets</p>
                    <p className="text-2xl font-black italic">{totalTickets}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Pending</p>
                    <p className="text-2xl font-black italic text-yellow-400">{bookings.filter(b => b.status === 'pending').length}</p>
                </div>
            </div>

            <div className="bg-card-bg border border-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search by customer..."
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-nba-red w-64" />
                        <button type="submit"
                            className="px-4 py-2 bg-nba-red rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">Search</button>
                    </form>
                    <span className="text-xs text-white/30">{bookings.length} booking(s)</span>
                </div>

                {bookings.length > 0 ? (
                    <div className="overflow-x-auto">
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
                                            }`}>{booking.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 flex-wrap">
                                                {booking.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleApprove(booking.id)}
                                                            className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">Approve</button>
                                                        <button onClick={() => handleCancel(booking.id)}
                                                            className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">Cancel</button>
                                                    </>
                                                )}
                                                {booking.status === 'success' && (
                                                    <button onClick={() => handleCancel(booking.id)}
                                                        className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">Cancel</button>
                                                )}
                                                <a href={`/admin/bookings/${booking.id}/edit`}
                                                    className="px-3 py-1.5 text-xs border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Edit</a>
                                                <button onClick={() => handleDelete(booking.id)}
                                                    className="px-3 py-1.5 text-xs border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-4xl font-black italic text-white/10 mb-4">NO BOOKINGS</p>
                        <p className="text-white/50">No bookings found.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
