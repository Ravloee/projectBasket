import { Link, usePage, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { PageProps } from '@/types';

const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/admin/matches', label: 'Manage Match', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { href: '/admin/bookings', label: 'Booking Data', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
];

interface AdminLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
    const { auth } = usePage<PageProps>().props;
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const user = auth.user;

    return (
        <div className="min-h-screen bg-page-bg flex">
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/5 z-40 hidden lg:flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-nba-red rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <span className="font-bold tracking-tight">NBA / ADMIN</span>
                    </Link>
                </div>

                <div className="px-6 py-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-nba-red rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                            {user?.name?.charAt(0) ?? 'A'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold truncate">{user?.name}</p>
                            <p className="text-xs text-white/50 uppercase tracking-wider">Administrator</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {adminLinks.map((link) => {
                        const active = path.startsWith(link.href);
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                                    active
                                        ? 'bg-nba-red/20 text-white border border-nba-red/30'
                                        : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                                )}
                            >
                                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                                </svg>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-3">
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-white/40 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Site
                    </Link>
                    <button
                        onClick={() => router.post('/logout')}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-red-500/10"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <header className="sticky top-0 z-30 bg-page-bg/90 backdrop-blur-xl border-b border-white/5">
                    <div className="flex items-center justify-between px-6 py-3">
                        <div className="flex items-center gap-3 lg:hidden">
                            <Link href="/admin/dashboard" className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-nba-red rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-sm">NBA / ADMIN</span>
                            </Link>
                        </div>

                        <h2 className="text-lg font-semibold tracking-tight hidden sm:block">{title}</h2>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 text-xs text-white/50">
                                <span className="w-2 h-2 bg-green-400 rounded-full" />
                                System Online
                            </div>
                            <button
                                onClick={() => router.post('/logout')}
                                className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
                                title="Logout"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="lg:hidden px-4 pb-3 flex gap-2 overflow-x-auto">
                        {adminLinks.map((link) => {
                            const active = path.startsWith(link.href);
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                                        active
                                            ? 'bg-nba-red/20 text-white border border-nba-red/30'
                                            : 'text-white/50 border border-transparent hover:text-white'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </header>

                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-black italic uppercase tracking-tighter mb-6 lg:hidden">{title}</h1>
                    {children}
                </main>
            </div>
        </div>
    );
}
