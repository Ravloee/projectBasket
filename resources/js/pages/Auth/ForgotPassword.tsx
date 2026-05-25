import { useState } from 'react';
import { router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

interface Props {
    status?: string;
}

export default function ForgotPassword({ status }: Props) {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        router.post('/forgot-password', { email }, {
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <div className="min-h-screen bg-page-bg">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-card-bg border border-white/5 rounded-xl p-8">
                        <h1 className="text-2xl font-bold text-center mb-2">Forgot Password</h1>
                        <p className="text-sm text-white/50 text-center mb-8">Enter your email to receive a reset link.</p>

                        {status && (
                            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-sm text-green-400">{status}</div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm text-white/50 mb-2 block">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" loading={submitting}>Send Reset Link</Button>
                        </form>

                        <p className="text-center text-sm text-white/50 mt-6">
                            <a href="/login" className="text-nba-red hover:underline">Back to login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
