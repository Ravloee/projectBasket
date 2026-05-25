<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!auth()->check()) {
            return redirect('/login');
        }

        if (auth()->user()->role !== $role) {
            $redirect = auth()->user()->role === 'admin' ? '/admin/dashboard' : '/dashboard';
            return redirect($redirect);
        }

        return $next($request);
    }
}