<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

const { cartCount } = useCart()
const { isVisible, message } = useToast()
</script>

<template>
  <div>
    <nav class="bg-white shadow-sm p-4">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600">SoleCustoms</NuxtLink>
        <div class="flex items-center space-x-6">
          <div>
            <NuxtLink to="/checkout" class="relative group cursor-pointer">
              <!-- Wil hier nog een winkelmand icoontje van maken -->
              <span class="text-gray-600 group-hover:text-blue-600 transition">MAND!</span>
              <span v-if="cartCount > 0" 
                    class="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-05 rounded-full animate-bounce">
                {{ cartCount }}
              </span>
            </NuxtLink>            
          </div>
          <NuxtLink to="/account" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Mijn Account
          </NuxtLink>
        </div>
      </div>
    </nav>
    <NuxtPage />
    <Analytics />
  </div>
  <div v-if="isVisible" class="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl transition-all animate-bounce z-50">
   {{ message }}
  </div>
</template>