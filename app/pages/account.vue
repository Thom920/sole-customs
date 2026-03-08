<script setup lang="ts">
const { orders, loadOrders } = useOrders()

onMounted(() => {
  loadOrders()
})

const formattedOrderCount = computed(() => `${orders.value.length} bestelling${orders.value.length === 1 ? '' : 'en'}`)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <section class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">      
      <h1 class="text-4xl font-extrabold text-gray-900 mt-2">Welkom terug</h1>
      <p class="text-gray-600 mt-3">Hier zie je een simpel overzicht van je eerdere bestellingen.</p>
      <p class="text-gray-900 font-semibold mt-4">{{ formattedOrderCount }}</p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Bestellingen</h2>

      <div v-if="orders.length === 0" class="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
        <p class="text-lg text-gray-600 mb-5">Je hebt nog geen bestellingen geplaatst.</p>
        <NuxtLink to="/" class="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
          Bekijk sneakers
        </NuxtLink>
      </div>

      <div v-else class="space-y-6">
        <article v-for="order in orders" :key="order.id" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex flex-wrap justify-between gap-3 mb-4">
            <div>
              <p class="font-bold text-gray-900">Order {{ order.id }}</p>
              <p class="text-sm text-gray-500">Geplaatst op {{ formatDate(order.createdAt) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Status</p>
              <p class="font-semibold text-blue-700">{{ order.status }}</p>
            </div>
          </div>

          <div class="space-y-3 mb-5">
            <div v-for="(item, index) in order.items" :key="`${order.id}-${index}`" class="flex items-center gap-4">
              <img :src="item.image" :alt="item.name" class="w-14 h-14 rounded-lg object-cover" />
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-sm text-gray-500">{{ item.brand }}</p>
              </div>
              <p class="font-semibold text-gray-900">€{{ item.price }}</p>
            </div>
          </div>

          <div class="flex flex-wrap justify-between gap-2 border-t border-gray-100 pt-4">
            <p class="text-gray-600">{{ order.itemCount }} item(s)</p>
            <p class="text-lg font-bold text-gray-900">Totaal: €{{ order.total }}</p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
