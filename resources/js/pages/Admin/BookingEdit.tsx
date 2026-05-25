import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/components/AdminLayout';
import type { Booking } from '@/types';

interface Props {
    booking: Booking;
}

export default function BookingEdit({ booking }: Props) {
    const [form, setForm] = useState({
        nama: booking.nama,
        jumlah: booking.jumlah,
        pembayaran: booking.pembayaran,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/admin/bookings/${booking.id}`, form);
    };

    return (
        <AdminLayout title="Edit Booking">
            <div className="max-w-2xl mx-auto">
                <div className="bg-card-bg border border-white/5 rounded-xl p-8">
                    <div className="mb-6 pb-6 border-b border-white/5">
                        <p className="text-sm text-white/50">Booking #{booking.id}</p>
                        <p className="font-semibold">{booking.game?.tim_home} vs {booking.game?.tim_away}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-white/50 mb-2 block">Name</label>
                            <input type="text" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red" />
                        </div>
                        <div>
                            <label className="text-sm text-white/50 mb-2 block">Tickets</label>
                            <input type="number" value={form.jumlah} onChange={e => setForm({ ...form, jumlah: Number(e.target.value) })} min={1}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red" />
                        </div>
                        <div>
                            <label className="text-sm text-white/50 mb-2 block">Payment Method</label>
                            <select value={form.pembayaran} onChange={e => setForm({ ...form, pembayaran: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red">
                                <option value="Cash">Cash</option>
                                <option value="Transfer">Transfer</option>
                                <option value="E-Wallet">E-Wallet</option>
                            </select>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit"
                                className="px-6 py-2 bg-nba-red rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">Update Booking</button>
                            <a href="/admin/bookings">
                                <button type="button"
                                    className="px-6 py-2 border border-white/10 rounded-lg text-sm font-semibold hover:bg-white/5 transition-colors">Cancel</button>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
