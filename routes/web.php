<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Game;
use App\Http\Controllers\ProfileController;
use Inertia\Inertia;

Route::get('/', function () {
    if (!auth()->check()) {
        $games = Game::latest()->get();
        return Inertia::render('Landing', ['games' => $games]);
    }

    return auth()->user()->role === 'admin'
        ? redirect('/admin')
        : redirect('/dashboard');
});

Route::get('/dashboard', function () {
    if (!auth()->check()) {
        return redirect('/login');
    }

    if (auth()->user()->role === 'admin') {
        return redirect('/admin');
    }

    $bookings = Booking::where('user_id', auth()->id())
        ->with('game')
        ->latest()
        ->get();

    $games = Game::latest()->get();

    return Inertia::render('Dashboard', [
        'bookings' => $bookings,
        'total' => $bookings->count(),
        'totalTiket' => $bookings->sum('jumlah'),
        'games' => $games,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:user'])->group(function () {

    Route::get('/matches', function () {
        $games = Game::latest()->get();
        return Inertia::render('Matches', ['games' => $games]);
    })->name('matches');

    Route::get('/booking', function (Request $request) {
        $game = null;
        if ($request->has('game_id')) {
            $game = Game::find($request->game_id);
        }
        $games = Game::latest()->get();
        return Inertia::render('Booking', [
            'game' => $game,
            'games' => $games,
        ]);
    });

    Route::post('/booking', function (Request $request) {
        $request->validate([
            'nama' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'pembayaran' => 'required|string',
            'game_id' => 'required|exists:matches,id',
        ]);

        Booking::create([
            'nama'       => $request->nama,
            'jumlah'     => $request->jumlah,
            'pembayaran' => $request->pembayaran,
            'user_id'    => auth()->id(),
            'status'     => 'pending',
            'game_id'    => $request->game_id,
        ]);

        return redirect('/riwayat')->with('success', 'Booking berhasil dibuat!');
    });

    Route::get('/riwayat', function () {
        $bookings = Booking::where('user_id', auth()->id())
            ->with('game')
            ->latest()
            ->get();

        return Inertia::render('Riwayat', ['bookings' => $bookings]);
    });

    Route::get('/edit/{id}', function ($id) {
        $booking = Booking::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        return Inertia::render('User/BookingEdit', ['booking' => $booking]);
    });

    Route::put('/update/{id}', function (Request $request, $id) {
        $booking = Booking::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $booking->update($request->only('nama', 'jumlah', 'pembayaran'));

        return redirect('/riwayat')->with('success', 'Booking berhasil diupdate!');
    });

    Route::delete('/hapus/{id}', function ($id) {
        Booking::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail()
            ->delete();

        return redirect('/riwayat')->with('success', 'Booking berhasil dihapus!');
    });
});

Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::put('/admin/status/{id}', function ($id) {
        $booking = Booking::findOrFail($id);
        $booking->update(['status' => 'success']);
        return redirect('/admin')->with('success', 'Status berhasil diupdate!');
    });

    Route::get('/admin', function (Request $request) {
        $search = $request->search;

        $bookings = Booking::when($search, function ($q, $search) {
                $q->where('nama', 'like', "%$search%");
            })
            ->with('game')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'bookings'   => $bookings,
            'total'      => Booking::count(),
            'totalTiket' => Booking::sum('jumlah'),
        ]);
    });

    Route::delete('/admin/delete/{id}', function ($id) {
        Booking::findOrFail($id)->delete();
        return redirect('/admin')->with('success', 'Deleted!');
    });

    Route::get('/admin/edit/{id}', function ($id) {
        $booking = Booking::findOrFail($id);
        return Inertia::render('Admin/BookingEdit', ['booking' => $booking]);
    });

    Route::put('/admin/update/{id}', function (Request $request, $id) {
        Booking::findOrFail($id)->update($request->only('nama', 'jumlah', 'pembayaran'));
        return redirect('/admin')->with('success', 'Updated!');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
