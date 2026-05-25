import MatchCard from '@/components/MatchCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Game } from '@/types';

interface Props {
    games: Game[];
}

export default function Matches({ games }: Props) {
    return (
        <div className="min-h-screen bg-page-bg">
            <Navbar />
            <div className="relative pt-24 pb-12 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-nba-red/10 rounded-full blur-[100px]" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">NBA <span className="text-nba-red">Matches</span></h1>
                    <p className="text-white/50">Browse upcoming games and secure your seats.</p>
                </div>
            </div>

            <section className="sticky top-0 z-20 bg-page-bg/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4 overflow-x-auto">
                        <div className="relative flex-1 max-w-md">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" placeholder="Search teams..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-nba-red" />
                        </div>
                        {['All', 'Upcoming', 'Regular Season', 'Playoffs'].map((filter) => (
                            <button key={filter} className="px-4 py-2 text-sm rounded-lg border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap">
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {games.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {games.map((game) => (
                                <MatchCard key={game.id} game={game} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-4xl font-black italic text-white/10 mb-4">NO MATCHES FOUND</p>
                            <p className="text-white/50 mb-6">No upcoming matches are currently available.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
