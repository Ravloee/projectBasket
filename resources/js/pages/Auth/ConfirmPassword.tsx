import { useState } from 'react';
import { router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

export default function ConfirmPassword() {
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        router.post('/confirm-password', { password }, {
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <div className="min-h-screen bg-page-bg">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-card-bg border border-white/5 rounded-xl p-8">
                        <h1 className="text-2xl font-bold text-center mb-2">Confirm Password</h1>
                        <p className="text-sm text-white/50 text-center mb-8">This is a secure area. Please confirm your password before continuing.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm text-white/50 mb-2 block">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nba-red"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" loading={submitting}>Confirm</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
