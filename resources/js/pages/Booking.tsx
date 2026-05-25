import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import type { Game, PageProps } from '@/types';

interface Props {
    game: Game | null;
    games: Game[];
}

export default function Booking({ game, games }: Props) {
    const { auth } = usePage<PageProps>().props;
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        nama: auth.user?.name ?? '',
        jumlah: 1,
        pembayaran: 'Transfer',
        game_id: game?.id ?? (games[0]?.id ?? 0),
    });

    const selectedGame = games.find(g => g.id === form.game_id) || game || games[0];
    const total = selectedGame ? selectedGame.harga * form.jumlah : 0;
    const maxTickets = 4;

    const handleSubmit = () => {
        router.post('/booking', form, {
            onSuccess: () => router.visit('/riwayat'),
        });
    };

    return (
        <div className="min-h-screen bg-page-bg">
            <Navbar />
            <div className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-4 mb-10">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    s <= step ? 'bg-nba-red text-white' : 'bg-white/10 text-white/30'
                                }`}>{s}</div>
                                <span className={`text-sm ${s <= step ? 'text-white' : 'text-white/30'}`}>
                                    {s === 1 ? 'Quantity' : s === 2 ? 'Seating' : 'Payment'}
                                </span>
                                {s < 3 && <div className="w-12 h-px bg-white/10 mx-2" />}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {step === 1 && (
                                <div className="bg-card-bg border border-white/5 rounded-xl p-8">
                                    <h2 className="text-2xl font-bold mb-6">Select Quantity</h2>
                                    <div className="mb-6">
                                        <label className="text-sm text-white/50 mb-2 block">Match</label>
                                        <select
                                            value={form.game_id}
                                            onChange={e => setForm({ ...form, game_id: Number(e.target.value) })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                        >
                                            {games.map(g => (
                                                <option key={g.id} value={g.id}>{g.tim_home} vs {g.tim_away} - {new Date(g.tanggal).toLocaleDateString()}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label className="text-sm text-white/50 mb-2 block">Name</label>
                                        <input
                                            type="text"
                                            value={form.nama}
                                            onChange={e => setForm({ ...form, nama: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/50 mb-2 block">Tickets (max {maxTickets})</label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setForm({ ...form, jumlah: Math.max(1, form.jumlah - 1) })}
                                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                                            >−</button>
                                            <span className="text-2xl font-bold w-8 text-center">{form.jumlah}</span>
                                            <button
                                                onClick={() => setForm({ ...form, jumlah: Math.min(maxTickets, form.jumlah + 1) })}
                                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="bg-card-bg border border-white/5 rounded-xl p-8">
                                    <h2 className="text-2xl font-bold mb-6">Select Seating</h2>
                                    <div className="grid grid-cols-6 gap-2 max-w-md mx-auto mb-6">
                                        {Array.from({ length: 48 }, (_, i) => (
                                            <div key={i} className="aspect-square bg-white/10 rounded border border-white/5 hover:bg-nba-red/30 cursor-pointer transition-colors flex items-center justify-center text-[8px] text-white/30">
                                                {i + 1}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-center text-white/30">Interactive seat selection • VIP section highlighted</p>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="bg-card-bg border border-white/5 rounded-xl p-8">
                                    <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                                    <div className="flex gap-3 mb-6">
                                        {['Credit Card', 'Transfer', 'E-Wallet'].map((method) => (
                                            <button
                                                key={method}
                                                onClick={() => setForm({ ...form, pembayaran: method })}
                                                className={`px-5 py-3 rounded-lg text-sm font-semibold border transition-all ${
                                                    form.pembayaran === method
                                                        ? 'bg-nba-red border-nba-red text-white'
                                                        : 'border-white/10 text-white/50 hover:bg-white/5'
                                                }`}
                                            >{method}</button>
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Expiry"
                                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between mt-6">
                                {step > 1 ? (
                                    <Button variant="outline" onClick={() => setStep(step - 1)}>Previous</Button>
                                ) : <div />}
                                {step < 3 ? (
                                    <Button onClick={() => setStep(step + 1)}>Continue</Button>
                                ) : (
                                    <Button onClick={handleSubmit}>Confirm Booking</Button>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-card-bg border border-white/5 rounded-xl p-6 sticky top-28">
                                <h3 className="font-bold mb-4">Order Summary</h3>
                                {selectedGame && (
                                    <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                                        <p className="font-semibold">{selectedGame.tim_home} vs {selectedGame.tim_away}</p>
                                        <p className="text-sm text-white/50">{selectedGame.lokasi}</p>
                                        <p className="text-sm text-white/50">{new Date(selectedGame.tanggal).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                )}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-white/50">Tickets ({form.jumlah}x)</span><span>${selectedGame ? selectedGame.harga * form.jumlah : 0}</span></div>
                                    <div className="flex justify-between"><span className="text-white/50">Service Fee</span><span>$10.00</span></div>
                                    <div className="flex justify-between font-bold text-lg border-t border-white/5 pt-2 mt-2">
                                        <span>Total</span><span className="text-nba-red">${total + 10}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
