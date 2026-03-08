import type { Sneaker } from '~/types/sneaker'
import type { Order, OrderItem } from '~/types/order'

const STORAGE_KEY = 'solecustoms-orders'

export const useOrders = () => {
    const orders = useState<Order[]>('orders', () => [])
    const hasLoadedOrders = useState<boolean>('hasLoadedOrders', () => false)

    const persistOrders = () => {
        if (!import.meta.client) return
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.value))
    }

    const loadOrders = () => {
        if (!import.meta.client || hasLoadedOrders.value) return

        const savedOrders = localStorage.getItem(STORAGE_KEY)
        if (savedOrders) {
            try {
                const parsed = JSON.parse(savedOrders)
                if (Array.isArray(parsed)) {
                    orders.value = parsed
                }
            } catch {
                orders.value = []
            }
        }

        hasLoadedOrders.value = true
    }

    const createOrder = (sneakers: Sneaker[]) => {
        if (sneakers.length === 0) return null

        loadOrders()

        const items: OrderItem[] = sneakers.map((sneaker) => ({
            id: sneaker.id,
            name: sneaker.name,
            brand: sneaker.brand,
            price: sneaker.price,
            image: sneaker.image
        }))

        const total = items.reduce((sum, item) => sum + item.price, 0)

        const order: Order = {
            id: `TP-${Date.now().toString().slice(-6)}`,
            createdAt: new Date().toISOString(),
            status: 'In behandeling',
            items,
            itemCount: items.length,
            total
        }

        orders.value = [order, ...orders.value]
        persistOrders()

        return order
    }

    const clearOrders = () => {
        orders.value = []
        persistOrders()
    }

    if (import.meta.client) {
        loadOrders()
    }

    return {
        orders,
        loadOrders,
        createOrder,
        clearOrders
    }
}
