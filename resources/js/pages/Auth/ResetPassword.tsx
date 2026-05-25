import { useState } from 'react';
import { router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

interface Props {
    token: string;
    email?: string;
}

export default function ResetPassword({ token, email: initialEmail }: Props) {
    const [form, setForm] = useState({ token, email: initialEmail ?? '', password: '', password_confirmation: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        router.post('/reset-password', form, {
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <div className="min-h-screen bg-page-bg">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-card-bg border border-white/5 rounded-xl p-8">
                        <h1 className="text-2xl font-bold text-center mb-8">Reset Password</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm text-white/50 mb-2 block">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm text-white/50 mb-2 block">New Password</label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm text-white/50 mb-2 block">Confirm Password</label>
                                <input
                                    type="password"
                                    value={form.password_confirmation}
                                    onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" loading={submitting}>Reset Password</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
