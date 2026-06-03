#!/bin/bash

echo "Menjalankan Laravel Server..."
php artisan serve &

echo "Menjalankan Vite Development Server..."
npm run dev
