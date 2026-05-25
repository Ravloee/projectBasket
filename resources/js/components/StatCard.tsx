import { cn } from '@/lib/utils';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    trend?: { value: string; positive: boolean };
    accent?: 'red' | 'blue' | 'green' | 'default';
}

export default function StatCard({ icon, label, value, trend, accent = 'default' }: StatCardProps) {
    const accentColors = {
        red: 'bg-nba-red/20 text-nba-red',
        blue: 'bg-nba-blue/20 text-nba-blue',
        green: 'bg-green-500/20 text-green-400',
        default: 'bg-white/10 text-white',
    };

    return (
        <div className="bg-card-bg border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', accentColors[accent])}>
                    {icon}
                </div>
                {trend && (
                    <span className={cn('flex items-center gap-1 text-xs font-medium', trend.positive ? 'text-green-400' : 'text-red-400')}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trend.positive ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
                        </svg>
                        {trend.value}
                    </span>
                )}
            </div>
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-3xl font-black italic">{value}</p>
        </div>
    );
}
