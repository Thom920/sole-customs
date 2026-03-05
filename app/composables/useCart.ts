import type { Sneaker } from '~/types/sneaker'

export const useCart = () => {
    const cartItems = useState<Sneaker[]>('cartItems', () => [])

    const addToCart = (sneaker: Sneaker) => {
        cartItems.value.push(sneaker)
    }

    const removeFromCart = (index: number) => {
        cartItems.value.splice(index, 1)
    }

    const clearCart = () => {
        cartItems.value = []
    }

    const cartCount = computed(() => cartItems.value.length)

    const totalPrice = computed(() =>
        cartItems.value.reduce((sum, item) => sum + item.price, 0)
    )

    return {
        cartItems,
        cartCount,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart
    }
}