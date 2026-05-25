export interface Game {
    id: number;
    tim_home: string;
    tim_away: string;
    tanggal: string;
    lokasi: string;
    harga: number;
    created_at: string;
    updated_at: string;
}

export interface Booking {
    id: number;
    nama: string;
    jumlah: number;
    pembayaran: string;
    user_id: number;
    status: 'pending' | 'success' | 'cancelled';
    game_id: number;
    created_at: string;
    updated_at: string;
    game?: Game;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    email_verified_at?: string;
}

export interface PageProps {
    auth: {
        user: User | null;
    };
    errors?: Record<string, string>;
    flash?: {
        success?: string;
        error?: string;
    };
}
