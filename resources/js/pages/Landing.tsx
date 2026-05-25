import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchCard from '@/components/MatchCard';
import TeamLogo from '@/components/TeamLogo';
import type { Game } from '@/types';

interface Props {
    games: Game[];
}

export default function Landing({ games }: Props) {
    const featured = games.slice(0, 3);

    return (
        <div className="min-h-screen bg-page-bg">
            <Navbar />

            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-page-bg" />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-nba-red/20 rounded-full blur-[120px]" />
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter mb-4">
                        NBA
                        <br />
                        <span className="outline-text">TICKETS</span>
                    </h1>
                    <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        Experience the thrill of live NBA action. Book your seats for the biggest games of the season.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <a href="/matches" className="px-8 py-3 bg-nba-red rounded-lg font-bold text-lg hover:bg-red-700 transition-all">
                            Buy Tickets
                        </a>
                        <a href="/matches" className="px-8 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/5 transition-all">
                            View Schedule
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-page-bg to-transparent" />
            </section>

            <section className="relative -mt-20 py-12 overflow-hidden">
                <div className="flex whitespace-nowrap animate-marquee-slow">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8 mx-4">
                            {['NBA FINALS 2026', 'PLAYOFFS', 'REGULAR SEASON', 'ALL-STAR', 'NBA FINALS 2026', 'PLAYOFFS', 'REGULAR SEASON', 'ALL-STAR'].map((text, j) => (
                                <span key={j} className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white/5">
                                    {text} • {text} •
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                            Upcoming <span className="text-nba-red">Matches</span>
                        </h2>
                        <a href="/matches" className="text-sm text-white/50 hover:text-white transition-colors">View All →</a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featured.map((game) => (
                            <MatchCard key={game.id} game={game} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-card-bg border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-10 text-center">
                        Top <span className="text-nba-red">Contenders</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {['Lakers', 'Warriors', 'Celtics', 'Bulls', 'Bucks', 'Nets'].map((team) => (
                            <div key={team} className="bg-white/5 border border-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-all group">
                                <TeamLogo team={team} size={64} className="mx-auto mb-3" />
                                <p className="text-sm font-semibold">{team}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-nba-red/10 via-transparent to-nba-blue/10" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
                        Ready for <span className="text-nba-red">Tip-Off</span>?
                    </h2>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto">Get your tickets now and be part of the action.</p>
                    <div className="flex items-center justify-center gap-8 text-center">
                        {[
                            { num: '50K+', label: 'Happy Fans' },
                            { num: '30+', label: 'Arenas' },
                            { num: 'MVP', label: 'Tier Access' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-3xl font-black italic">{stat.num}</p>
                                <p className="text-xs text-white/50">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
