import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

export default function VerifyEmail() {
    const handleResend = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        form.submit();
    };

    return (
        <div className="min-h-screen bg-page-bg">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-card-bg border border-white/5 rounded-xl p-8 text-center">
                        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
                        <p className="text-sm text-white/50 mb-6">
                            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                        </p>

                        <form method="POST" action="/email/verification-notification" onSubmit={handleResend}>
                            <input type="hidden" name="_token" value="" />
                            <Button type="submit">Resend Verification Email</Button>
                        </form>

                        <form method="POST" action="/logout" className="mt-4">
                            <input type="hidden" name="_token" value="" />
                            <Button type="submit" variant="ghost">Log Out</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
