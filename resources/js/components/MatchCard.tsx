import { Link } from '@inertiajs/react';
import type { Game } from '@/types';

interface MatchCardProps {
    game: Game;
    compact?: boolean;
}

export default function MatchCard({ game, compact }: MatchCardProps) {
    return (
        <Link href={`/booking?game_id=${game.id}`} className="block">
            <div className="bg-card-bg border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all group">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs px-2 py-1 bg-nba-red/20 text-nba-red rounded-full font-semibold">Available</span>
                    {!compact && (
                        <span className="text-xs text-white/30">NBA Regular Season</span>
                    )}
                </div>
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold">
                            {game.tim_home.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-center">{game.tim_home}</span>
                    </div>
                    <span className="text-2xl font-black italic text-white/20">VS</span>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold">
                            {game.tim_away.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-center">{game.tim_away}</span>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {game.lokasi}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(game.tanggal).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold">From <span className="text-nba-red">${game.harga}</span></span>
                    <div className="w-8 h-8 bg-nba-red rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
