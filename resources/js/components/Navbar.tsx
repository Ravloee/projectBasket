import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { PageProps } from '@/types';

export default function Navbar() {
    const { auth } = usePage<PageProps>().props;
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = auth.user;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isDashboard = typeof window !== 'undefined' && (
        window.location.pathname.startsWith('/dashboard') ||
        window.location.pathname.startsWith('/admin')
    );

    if (isDashboard) return null;

    return (
        <nav className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
            scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-nba-red rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <span className="font-bold text-lg tracking-tight">NBA / TICKETS</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/matches" className="text-sm text-white/70 hover:text-white transition-colors">Matches</Link>
                        <Link href="/matches" className="text-sm text-white/70 hover:text-white transition-colors">Teams</Link>
                        {user ? (
                            <div className="flex items-center gap-3">
                                {user.role === 'admin' ? (
                                    <Link href="/admin" className="text-sm px-4 py-2 bg-nba-red rounded-lg font-semibold hover:bg-red-700 transition-colors">Admin Panel</Link>
                                ) : (
                                    <Link href="/dashboard" className="text-sm px-4 py-2 bg-nba-red rounded-lg font-semibold hover:bg-red-700 transition-colors">Dashboard</Link>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors">Log in</Link>
                                <Link href="/register" className="text-sm px-4 py-2 bg-nba-red rounded-lg font-semibold hover:bg-red-700 transition-colors">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5">
                    <div className="px-4 py-4 space-y-3">
                        <Link href="/matches" className="block text-sm text-white/70 hover:text-white py-2">Matches</Link>
                        <Link href="/matches" className="block text-sm text-white/70 hover:text-white py-2">Teams</Link>
                        {user ? (
                            user.role === 'admin' ? (
                                <Link href="/admin" className="block text-sm px-4 py-2 bg-nba-red rounded-lg font-semibold text-center">Admin Panel</Link>
                            ) : (
                                <Link href="/dashboard" className="block text-sm px-4 py-2 bg-nba-red rounded-lg font-semibold text-center">Dashboard</Link>
                            )
                        ) : (
                            <>
                                <Link href="/login" className="block text-sm px-4 py-2 border border-white/20 rounded-lg text-center">Log in</Link>
                                <Link href="/register" className="block text-sm px-4 py-2 bg-nba-red rounded-lg font-semibold text-center">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
