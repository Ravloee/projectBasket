export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-nba-red rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <span className="font-bold">NBA / TICKETS</span>
                        </div>
                        <p className="text-sm text-white/50">Premium NBA ticket booking platform.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-white/50">
                            <li><a href="/matches" className="hover:text-white transition-colors">Matches</a></li>
                            <li><a href="/matches" className="hover:text-white transition-colors">Top Teams</a></li>
                            <li><a href="/matches" className="hover:text-white transition-colors">Venues</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Support</h4>
                        <ul className="space-y-2 text-sm text-white/50">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Ticket Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Newsletter</h4>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-nba-red" />
                            <button className="px-4 py-2 bg-nba-red rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">JOIN</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-white/30">
                    &copy; 2026 NBA Ticket System. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
