<script setup lang="ts">
import { mockSneakers } from '~/data/sneakers'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm p-4">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-600">SoleCustoms</h1>
        <div class="space-x-4">
          <button class="text-gray-600 hover:text-blue-600">Shop</button>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Mijn Account</button>
        </div>
      </div>
    </nav>

    <header class="max-w-6xl mx-auto py-12 px-4">
      <h2 class="text-4xl font-extrabold text-gray-900">Exclusieve Custom Sneakers</h2>
      <p class="text-gray-500 mt-2">Vind unieke ontwerpen die nergens anders te krijgen zijn.</p>
    </header>

    <main class="max-w-6xl mx-auto px-4 pb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="sneaker in mockSneakers" :key="sneaker.id" 
             class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
          <img :src="sneaker.image" class="h-64 w-full object-cover" />
          <div class="p-6">
            <span class="text-xs font-bold text-blue-500 uppercase">{{ sneaker.brand }}</span>
            <h3 class="text-lg font-bold mt-1">{{ sneaker.name }}</h3>
            <p class="text-gray-600 text-sm mt-2 line-clamp-2">{{ sneaker.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-xl font-bold">€{{ sneaker.price }}</span>
              <button class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Bekijk Deal
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>