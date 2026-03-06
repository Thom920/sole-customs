<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Sneaker } from '~/types/sneaker'

const client = useSupabaseClient()
const { addToCart } = useCart()
const { showToast } = useToast()

const selectedBrand = ref('Alle')

const { data: sneakers, pending, error } = await useAsyncData<Sneaker[]>(
  'sneakers',
  async () => {
    const { data, error } = await client.from('sneakers').select('*')
    if (error) throw error
    return data ?? []
  },
  {
    default: () => []
  }
)

const brands = computed(() => {
  const uniqueBrands = [...new Set((sneakers.value ?? []).map(s => s.brand))]
  return ['Alle', ...uniqueBrands]
})

const getBrandCount = (brand: string) => {
  const list = sneakers.value ?? []
  if (brand === 'Alle') return list.length
  return list.filter(sneaker => sneaker.brand === brand).length
}

const filteredSneakers = computed(() => {
  const list = sneakers.value ?? []
  if (selectedBrand.value === 'Alle') return list
  return list.filter(sneaker => sneaker.brand === selectedBrand.value)
})

const handleAddToCart = (sneaker: Sneaker) => {
  addToCart(sneaker)
  showToast(`${sneaker.name} toegevoegd aan winkelmandje!`)
}
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
          {{ brand }} ({{ getBrandCount(brand) }})
        </button>
      </div>
    </div>

    <main class="max-w-6xl mx-auto px-4 pb-20">
      <p v-if="pending" class="text-gray-500 mb-6">Sneakers laden...</p>
      <p v-else-if="error" class="text-red-500 mb-6">Fout bij ophalen van sneakers.</p>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="sneaker in filteredSneakers"
          :key="sneaker.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img :src="sneaker.image" class="h-64 w-full object-cover" />
          <div class="p-6">
            <span class="text-xs font-bold text-blue-500 uppercase">{{ sneaker.brand }}</span>
            <h3 class="text-lg font-bold mt-1">{{ sneaker.name }}</h3>
            <p class="text-gray-600 text-sm mt-2 line-clamp-2">{{ sneaker.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-xl font-bold">€{{ sneaker.price }}</span>
              <div class="flex gap-2">
                <NuxtLink
                  :to="`/sneaker/${sneaker.id}`"
                  class="bg-gray-900 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
                >
                  Meer info
                </NuxtLink>
                <button
                  @click.stop="handleAddToCart(sneaker)"
                  class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center w-10 h-10"
                >
                  <img src="/images/basket.png" alt="Add to cart" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>