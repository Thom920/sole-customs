<script setup lang="ts">
import { useRoute } from 'vue-router'
import { mockSneakers } from '~/data/sneakers'

const route = useRoute()
const sneaker = mockSneakers.find(s => s.id === Number(route.params.id))
</script>

<template>
  <div v-if="sneaker" class="max-w-6xl mx-auto p-8">
    <NuxtLink to="/" class="text-blue-600 mb-8 inline-block">Terug naar overzicht</NuxtLink>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <img :src="sneaker.image" class="rounded-3xl shadow-2xl w-full object-cover h-[500px]" />
      
      <div>
        <span class="text-blue-500 font-bold uppercase tracking-widest">{{ sneaker.brand }}</span>
        <h1 class="text-5xl font-black mt-2 mb-4">{{ sneaker.name }}</h1>
        <p class="text-2xl font-light text-gray-600 mb-8">{{ sneaker.description }}</p>
        
        <div class="border-t pt-8">
          <span class="text-4xl font-bold">€{{ sneaker.price }}</span>
          <button class="block w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl text-xl font-bold hover:bg-blue-700 transition">
            Koop nu!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>