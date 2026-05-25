import Sidebar from './Sidebar';

interface DashboardLayoutProps {
    role: 'admin' | 'user';
    title: string;
    children: React.ReactNode;
}

export default function DashboardLayout({ role, title, children }: DashboardLayoutProps) {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const isAdmin = currentPath.startsWith('/admin');

    return (
        <div className="min-h-screen bg-page-bg">
            <Sidebar role={role} />
            <div className="lg:ml-64">
                <header className="sticky top-0 z-30 bg-page-bg/80 backdrop-blur-xl border-b border-white/5">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder={isAdmin ? "Search bookings..." : "Search matches..."}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-nba-red"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-white/50 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-nba-red rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>
                <main className="p-6">
                    <h1 className="text-2xl font-black italic uppercase tracking-tighter mb-6">{title}</h1>
                    {children}
                </main>
            </div>
        </div>
    );
}
