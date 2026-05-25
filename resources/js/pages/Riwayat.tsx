import { router } from '@inertiajs/react';
import DashboardLayout from '@/components/DashboardLayout';
import type { Booking } from '@/types';

interface Props {
    bookings: Booking[];
}

export default function Riwayat({ bookings }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Hapus booking ini?')) {
            router.delete(`/hapus/${id}`);
        }
    };

    return (
        <DashboardLayout role="user" title="My Tickets">
            <div className="bg-card-bg border border-white/5 rounded-xl overflow-hidden">
                {bookings.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-white/50 text-xs uppercase tracking-wider">
                                <th className="text-left px-6 py-4 font-medium">Match</th>
                                <th className="text-left px-6 py-4 font-medium">Date</th>
                                <th className="text-left px-6 py-4 font-medium">Tickets</th>
                                <th className="text-left px-6 py-4 font-medium">Payment</th>
                                <th className="text-left px-6 py-4 font-medium">Status</th>
                                <th className="text-right px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-semibold">
                                        {booking.game?.tim_home} vs {booking.game?.tim_away}
                                    </td>
                                    <td className="px-6 py-4 text-white/50">
                                        {booking.game ? new Date(booking.game.tanggal).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
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
                                            <a href={`/edit/${booking.id}`} className="px-3 py-1.5 text-xs border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Edit</a>
                                            <button onClick={() => handleDelete(booking.id)} className="px-3 py-1.5 text-xs border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-4xl font-black italic text-white/10 mb-4">NO TICKETS YET</p>
                        <p className="text-white/50 mb-6">You haven't booked any tickets.</p>
                        <a href="/matches" className="px-6 py-3 bg-nba-red rounded-lg font-semibold inline-block hover:bg-red-700 transition-colors">Browse Matches</a>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
