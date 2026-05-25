import { useState } from 'react';
import { router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

interface Props {
    status?: string;
    errors?: Record<string, string>;
}

export default function Login({ status }: Props) {
    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        router.post('/login', form, {
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <div className="min-h-screen bg-page-bg">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-card-bg border border-white/5 rounded-xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 bg-nba-red rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold">Welcome Back</h1>
                            <p className="text-sm text-white/50 mt-1">Sign in to your account</p>
                        </div>

                        {status && (
                            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-sm text-green-400">{status}</div>
                        )}

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
                                <label className="text-sm text-white/50 mb-2 block">Password</label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-white/50">
                                    <input type="checkbox" checked={form.remember} onChange={e => setForm({ ...form, remember: e.target.checked })} className="rounded border-white/10 bg-white/5" />
                                    Remember me
                                </label>
                                <a href="/forgot-password" className="text-sm text-nba-red hover:underline">Forgot password?</a>
                            </div>
                            <Button type="submit" className="w-full" loading={submitting}>Sign In</Button>
                        </form>

                        <p className="text-center text-sm text-white/50 mt-6">
                            Don't have an account? <a href="/register" className="text-nba-red hover:underline">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
