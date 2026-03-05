<script setup lang="ts">
const { cartItems, totalPrice, removeFromCart, clearCart } = useCart()
const isProcessing = ref(false)
const isFinished = ref(false)

const handleCheckout = async () => {
  isProcessing.value = true
  
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  isProcessing.value = false
  isFinished.value = true
  
  clearCart() 
}
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
                    <button @click="removeFromCart(index)" class="text-red-400 hover:text-red-600 p-3 transition hover:scale-110">
                        <img src="/images/bin.png" alt="Verwijderen" class="w-6 h-6" />
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
                <button 
                @click="handleCheckout" 
                :disabled="isProcessing"
                class="w-full bg-blue-600 text-white mt-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center justify-center"
                >
                    <span v-if="isProcessing" class="flex items-center">
                        <svg class="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                        Bankverbinding maken...
                    </span>
                    <span v-else>Veilig Afrekenen</span>
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
    <div v-if="isFinished" class="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl scale-in-center">
            <div class="text-6xl mb-6">🎉</div>
            <h2 class="text-3xl font-black mb-2">Betaling Geslaagd!</h2>
            <p class="text-gray-600 mb-8">Je custom sneakers worden nu gemaakt</p>
            <NuxtLink to="/" class="block w-full bg-gray-900 text-white py-4 rounded-xl font-bold">
                Verder Winkelen
            </NuxtLink>
        </div>
    </div>
</template>

