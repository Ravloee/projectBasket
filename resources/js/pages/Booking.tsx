import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import TeamLogo from '@/components/TeamLogo';
import type { Game, PageProps } from '@/types';

interface Props {
    game: Game | null;
    games: Game[];
}

export default function Booking({ game, games }: Props) {
    const { auth } = usePage<PageProps>().props;
    const [step, setStep] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [form, setForm] = useState({
        nama: auth.user?.name ?? '',
        jumlah: 1,
        pembayaran: 'Transfer',
        game_id: game?.id ?? (games[0]?.id ?? 0),
        kursi: '',
    });

    const selectedGame = games.find(g => g.id === form.game_id) || game || games[0];
    const totalSeats = selectedSeats.length;
    const total = selectedGame ? selectedGame.harga * Math.max(totalSeats, form.jumlah) : 0;
    const maxTickets = 4;

    const toggleSeat = (seatNum: number) => {
        setSelectedSeats(prev => {
            const next = prev.includes(seatNum)
                ? prev.filter(s => s !== seatNum)
                : prev.length < maxTickets ? [...prev, seatNum] : prev;
            return next;
        });
    };

    const handleStepChange = (nextStep: number) => {
        if (nextStep === 3 && totalSeats > 0) {
            setForm(prev => ({
                ...prev,
                jumlah: totalSeats,
                kursi: JSON.stringify(selectedSeats),
            }));
        }
        setStep(nextStep);
    };

    const handleSubmit = () => {
        const finalForm = {
            ...form,
            jumlah: totalSeats > 0 ? totalSeats : form.jumlah,
            kursi: totalSeats > 0 ? JSON.stringify(selectedSeats) : form.kursi,
        };
        router.post('/booking', finalForm, {
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
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-nba-red"
                                        >
                                            {games.map(g => (
                                                <option key={g.id} value={g.id} className="bg-gray-900 text-white">{g.tim_home} vs {g.tim_away} - {new Date(g.tanggal).toLocaleDateString()}</option>
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
                                    <h2 className="text-2xl font-bold mb-2">Select Seating</h2>
                                    <p className="text-sm text-white/50 mb-6">
                                        {totalSeats > 0
                                            ? `${totalSeats} seat(s) selected — tap more to add (max ${maxTickets})`
                                            : `Tap seats to select (max ${maxTickets})`}
                                    </p>
                                    <div className="grid grid-cols-6 gap-2 max-w-md mx-auto mb-6">
                                        {Array.from({ length: 48 }, (_, i) => {
                                            const seatNum = i + 1;
                                            const isSelected = selectedSeats.includes(seatNum);
                                            return (
                                                <button
                                                    key={seatNum}
                                                    type="button"
                                                    onClick={() => toggleSeat(seatNum)}
                                                    className={`aspect-square rounded border transition-all duration-150 flex items-center justify-center text-[10px] font-semibold ${
                                                        isSelected
                                                            ? 'bg-nba-red border-nba-red text-white shadow-lg shadow-red-900/40 scale-105'
                                                            : selectedSeats.length >= maxTickets
                                                                ? 'bg-white/5 border-white/5 text-white/20 cursor-not-allowed'
                                                                : 'bg-white/10 border-white/10 text-white/40 hover:bg-nba-red/30 hover:border-nba-red/50 hover:text-white'
                                                    }`}
                                                >
                                                    {seatNum}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="flex items-center justify-center gap-4 text-xs text-white/30">
                                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-white/10 border border-white/10 inline-block" /> Available</span>
                                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-nba-red border border-nba-red inline-block" /> Selected</span>
                                    </div>
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
                                    <Button onClick={() => handleStepChange(step + 1)}>Continue</Button>
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
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="flex flex-col items-center gap-1">
                                                <TeamLogo team={selectedGame.tim_home} size={36} />
                                                <span className="text-xs text-white/50">{selectedGame.tim_home}</span>
                                            </div>
                                            <span className="text-lg font-black italic text-white/20">VS</span>
                                            <div className="flex flex-col items-center gap-1">
                                                <TeamLogo team={selectedGame.tim_away} size={36} />
                                                <span className="text-xs text-white/50">{selectedGame.tim_away}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-white/50 text-center">{selectedGame.lokasi}</p>
                                        <p className="text-sm text-white/50 text-center">{new Date(selectedGame.tanggal).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                )}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-white/50">Tickets ({Math.max(totalSeats, form.jumlah)}x)</span><span>${selectedGame ? selectedGame.harga * Math.max(totalSeats, form.jumlah) : 0}</span></div>
                                    {totalSeats > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-white/50">Seats</span>
                                            <span className="text-xs">{selectedSeats.sort((a, b) => a - b).join(', ')}</span>
                                        </div>
                                    )}
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
