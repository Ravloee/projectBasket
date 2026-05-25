import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { PageProps } from '@/types';

const adminLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin', label: 'Matches' },
    { href: '/admin', label: 'Tickets' },
    { href: '/admin', label: 'Users' },
    { href: '/admin', label: 'Transactions' },
];

const userLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/riwayat', label: 'My Tickets' },
    { href: '/matches', label: 'Favorites' },
    { href: '/riwayat', label: 'History' },
];

interface SidebarProps {
    role: 'admin' | 'user';
}

export default function Sidebar({ role }: SidebarProps) {
    const { auth } = usePage<PageProps>().props;
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const user = auth.user;
    const links = role === 'admin' ? adminLinks : userLinks;

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/5 z-40 hidden lg:flex flex-col">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-nba-red rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                    </div>
                    <span className="font-bold">NBA / TICKETS</span>
                </Link>
            </div>

            <div className="px-6 mb-6">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 bg-nba-red rounded-full flex items-center justify-center text-sm font-bold">
                        {user?.name?.charAt(0) ?? 'U'}
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-white/50 uppercase">{role}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {links.map((link) => {
                    const active = path === link.href;
                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all',
                                active
                                    ? 'bg-white/10 text-white border-r-2 border-nba-red'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                            )}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6">
                <div className="p-4 bg-gradient-to-br from-nba-red/20 to-nba-blue/20 rounded-lg border border-white/5">
                    <p className="text-xs font-semibold mb-1">NBA League Pass</p>
                    <p className="text-xs text-white/50 mb-3">UPGRADE NOW</p>
                    <button className="w-full py-1.5 bg-nba-red rounded text-xs font-semibold hover:bg-red-700 transition-colors">Get Access</button>
                </div>
                <Link href="/" className="flex items-center gap-2 mt-4 text-sm text-white/50 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Exit Dashboard
                </Link>
            </div>
        </aside>
    );
}
