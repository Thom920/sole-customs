<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockSneakers } from '~/data/sneakers'

const selectedBrand = ref('Alle')

const brands = ['Alle', 'Nike', 'Adidas', 'Vans', 'Converse']

const filteredSneakers = computed(() => {
  if (selectedBrand.value === 'Alle') {
    return mockSneakers
  }
  return mockSneakers.filter(sneaker => sneaker.brand === selectedBrand.value)
})
</script>

<template>
  <div>
    <header class="max-w-6xl mx-auto py-12 px-4">
      <h2 class="text-4xl font-extrabold text-gray-900">Exclusieve Custom Sneakers</h2>
      <p class="text-gray-500 mt-2">Vind unieke ontwerpen die nergens anders te krijgen zijn.</p>
    </header>

    <div class="max-w-6xl mx-auto px-4 mb-8">
  <div class="flex flex-wrap gap-3">
    <button 
      v-for="brand in brands" 
      :key="brand"
      @click="selectedBrand = brand"
      :class="[
        'px-6 py-2 rounded-full border transition-all duration-200 font-medium',
        selectedBrand === brand 
          ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
          : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
      ]"
    >
      {{ brand }}
    </button>
  </div>
</div>

    <main class="max-w-6xl mx-auto px-4 pb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="sneaker in filteredSneakers" :key="sneaker.id" 
             class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
          <img :src="sneaker.image" class="h-64 w-full object-cover" />
          <div class="p-6">
            <span class="text-xs font-bold text-blue-500 uppercase">{{ sneaker.brand }}</span>
            <h3 class="text-lg font-bold mt-1">{{ sneaker.name }}</h3>
            <p class="text-gray-600 text-sm mt-2 line-clamp-2">{{ sneaker.description }}</p>
            <div class="mt-4 flex justify-between items-center">
                <span class="text-xl font-bold">€{{ sneaker.price }}</span>
                <NuxtLink :to="`/sneaker/${sneaker.id}`" class="bg-gray-900 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition">
                    Meer info
                </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>