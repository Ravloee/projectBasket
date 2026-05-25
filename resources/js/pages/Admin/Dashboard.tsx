import AdminLayout from '@/components/AdminLayout';
import type { Booking, Game } from '@/types';

interface Props {
    bookings: Booking[];
    total: number;
    totalTiket: number;
    totalUsers: number;
    games: Game[];
}

export default function AdminDashboard({ bookings, total, totalTiket, totalUsers, games }: Props) {
    const activeMatches = games.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const successBookings = bookings.filter(b => b.status === 'success').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.jumlah * (b.game?.harga ?? 0)), 0);
    const recentBookings = bookings.slice(0, 5);

    const statCards = [
        { label: 'Total Matches', value: activeMatches, color: 'text-blue-400' },
        { label: 'Total Bookings', value: total, color: 'text-white' },
        { label: 'Total Users', value: totalUsers, color: 'text-purple-400' },
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'text-nba-red' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-card-bg border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
                        <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{card.label}</p>
                        <p className={`text-3xl font-black italic ${card.color}`}>{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Tickets Sold</p>
                    <p className="text-2xl font-black italic">{totalTiket}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-5 border-yellow-500/20">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Pending</p>
                    <p className="text-2xl font-black italic text-yellow-400">{pendingBookings}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-5 border-green-500/20">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Approved</p>
                    <p className="text-2xl font-black italic text-green-400">{successBookings}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card-bg border border-white/5 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                        <h3 className="font-bold">Recent Bookings</h3>
                        <a href="/admin/bookings" className="text-xs text-nba-red hover:underline">View All</a>
                    </div>
                    {recentBookings.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5 text-white/50 text-xs uppercase tracking-wider">
                                    <th className="text-left px-6 py-3 font-medium">Customer</th>
                                    <th className="text-left px-6 py-3 font-medium">Match</th>
                                    <th className="text-left px-6 py-3 font-medium">Tickets</th>
                                    <th className="text-left px-6 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((b) => (
                                    <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-3 font-semibold">{b.nama}</td>
                                        <td className="px-6 py-3 text-white/70">{b.game?.tim_home} vs {b.game?.tim_away}</td>
                                        <td className="px-6 py-3">{b.jumlah}</td>
                                        <td className="px-6 py-3">
                                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                                b.status === 'success' ? 'bg-green-500/20 text-green-400' :
                                                b.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>{b.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-6 text-center text-sm text-white/30">No bookings yet.</div>
                    )}
                </div>

                <div className="bg-card-bg border border-white/5 rounded-xl p-6">
                    <h3 className="font-bold mb-4">Booking Status</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-white/70">Approved</span>
                                <span className="text-green-400">{successBookings}</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${total > 0 ? (successBookings / total) * 100 : 0}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-white/70">Pending</span>
                                <span className="text-yellow-400">{pendingBookings}</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full transition-all" style={{ width: `${total > 0 ? (pendingBookings / total) * 100 : 0}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-white/70">Cancelled</span>
                                <span className="text-red-400">{cancelledBookings}</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${total > 0 ? (cancelledBookings / total) * 100 : 0}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <a href="/admin/matches" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <p className="text-sm font-semibold">Manage Matches</p>
                            <p className="text-xs text-white/50">{activeMatches} matches available</p>
                        </a>
                        <a href="/admin/bookings" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <p className="text-sm font-semibold">All Bookings</p>
                            <p className="text-xs text-white/50">{total} total transactions</p>
                        </a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
