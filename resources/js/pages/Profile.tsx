import { usePage } from '@inertiajs/react';
import DashboardLayout from '@/components/DashboardLayout';
import type { PageProps } from '@/types';

export default function Profile() {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <DashboardLayout role={user?.role === 'admin' ? 'admin' : 'user'} title="My Profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-card-bg border border-white/5 rounded-xl overflow-hidden">
                        <div className="h-20 bg-gradient-to-r from-nba-red to-nba-blue" />
                        <div className="px-6 pb-6 -mt-10">
                            <div className="w-20 h-20 rounded-full border-4 border-page-bg bg-white/10 flex items-center justify-center text-3xl font-bold mb-4">
                                {user?.name?.charAt(0) ?? 'U'}
                            </div>
                            <h2 className="text-xl font-bold">{user?.name}</h2>
                            <p className="text-sm text-white/50">{user?.email}</p>
                            <div className="flex gap-4 mt-4 text-center">
                                <div><p className="text-lg font-bold">12</p><p className="text-xs text-white/50">Matches</p></div>
                                <div><p className="text-lg font-bold">5</p><p className="text-xs text-white/50">Teams</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card-bg border border-white/5 rounded-xl p-6">
                        <h3 className="font-bold mb-4">Account Settings</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Preferences', desc: 'Game notifications, reminders' },
                                { label: 'Notifications', desc: 'Email and push settings' },
                                { label: 'Payment Methods', desc: 'Manage your payment options' },
                                { label: 'Ticket Policies', desc: 'View refund and exchange policies' },
                            ].map((item) => (
                                <div key={item.label} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer">
                                    <p className="font-semibold text-sm">{item.label}</p>
                                    <p className="text-xs text-white/50 mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
