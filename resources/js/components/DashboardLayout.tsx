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
