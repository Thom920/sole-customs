<script setup lang="ts">
const { cartItems, totalPrice, removeFromCart } = useCart()
</script>

<template>
    <div class="max-w-5xl mx-auto p-8">
        <h1 class="text-4xl font-extrabold mb-10 text-gray-900">Jouw Winkelmand</h1>

        <div v-if="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-4">
                <div v-for="(item, index) in cartItems" :key="index" 
                class="flex items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <img :src="item.image" class="w-24 h-24 object-cover rounded-xl" />
                    <div class="ml-6 flex-1">
                        <h3 class="font-bold text-lg">{{ item.name }}</h3>
                        <p class="text-blue-600 font-bold">€{{ item.price }}</p>
                    </div>
                    <button @click="removeFromCart(index)" class="text-red-400 hover:text-red-600 p-2">
                        <!-- Wil hier nog een prullenbakje van maken -->
                        Verwijder
                    </button>
                </div>
            </div>

            <div class="bg-gray-50 p-6 rounded-3xl h-fit border border-gray-200">
                <h2 class="text-xl font-bold mb-4">Overzicht</h2>
                <div class="flex justify-between mb-2 text-gray-600">
                    <span>Subtotaal</span>
                    <span>€{{ totalPrice }}</span>
                </div>
                <div class="flex justify-between mb-6 text-gray-600">
                    <span>Verzending</span>
                    <span class="text-green-600 font-medium">Gratis</span>
                </div>
                <div class="flex justify-between text-2xl font-black border-t pt-4">
                    <span>Totaal</span>
                    <span>€{{ totalPrice }}</span>
                </div>
                <button class="w-full bg-blue-600 text-white mt-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                    Afrekenen
                </button>
            </div>
        </div>

        <div v-else class="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p class="text-gray-500 text-xl mb-6">Je mandje voelt zich eenzaam...</p>
            <NuxtLink to="/" class="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold inline-block hover:scale-110 transition">
                SHOP NU!
            </NuxtLink>
        </div>
    </div>
</template>