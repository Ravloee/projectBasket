import DashboardLayout from '@/components/DashboardLayout';
import MatchCard from '@/components/MatchCard';
import type { Booking, Game } from '@/types';

interface Props {
    bookings: Booking[];
    total: number;
    totalTiket: number;
    games: Game[];
}

export default function Dashboard({ bookings, total, totalTiket, games }: Props) {
    const recentBookings = bookings.slice(0, 4);
    const pendingCount = bookings.filter(b => b.status === 'pending').length;
    const successCount = bookings.filter(b => b.status === 'success').length;

    return (
        <DashboardLayout role="user" title="Fan Dashboard">
            <div className="bg-gradient-to-r from-nba-red/20 via-nba-blue/20 to-transparent rounded-xl p-8 border border-white/5 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xs px-2 py-1 bg-nba-red rounded-full font-semibold mb-3 inline-block">MVP FAN</span>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter mt-2">Welcome back!</h2>
                        <p className="text-white/50 mt-1">Ready for tonight's game?</p>
                        <div className="flex gap-3 mt-4">
                            <a href="/matches" className="px-5 py-2 bg-nba-red rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">My Tickets</a>
                            <a href="/matches" className="px-5 py-2 border border-white/20 rounded-lg text-sm font-semibold hover:bg-white/5 transition-colors">Explore Deals</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total Bookings</p>
                    <p className="text-3xl font-black italic">{total}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Tickets</p>
                    <p className="text-3xl font-black italic">{totalTiket}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Active</p>
                    <p className="text-3xl font-black italic text-green-400">{successCount}</p>
                </div>
                <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Pending</p>
                    <p className="text-3xl font-black italic text-yellow-400">{pendingCount}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <h3 className="text-lg font-bold mb-4">Recent Bookings</h3>
                    {recentBookings.length > 0 ? (
                        <div className="space-y-3">
                            {recentBookings.map((booking) => (
                                <div key={booking.id} className="bg-card-bg border border-white/5 rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">{booking.game?.tim_home} vs {booking.game?.tim_away}</p>
                                        <p className="text-xs text-white/50">{booking.jumlah} ticket(s) • {booking.pembayaran}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                        booking.status === 'success' ? 'bg-green-500/20 text-green-400' :
                                        booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/30 text-sm">No bookings yet. <a href="/matches" className="text-nba-red hover:underline">Browse matches</a></p>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Access</h3>
                    <div className="bg-card-bg border border-white/5 rounded-xl p-5">
                        <p className="text-xs text-white/50 mb-1">Price Alert</p>
                        <p className="text-sm font-semibold">Special deals available</p>
                        <a href="/matches" className="text-xs text-nba-red hover:underline mt-2 inline-block">Check matches →</a>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
