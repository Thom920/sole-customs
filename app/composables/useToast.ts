export const useToast = () => {
    const isVisible = useState('toastVisible', () => false)
    const message = useState('toastMessage', () => '')

    const showToast = (msg: string) => {
        message.value = msg
        isVisible.value = true
        setTimeout(() => isVisible.value = false, 4000)
    }

    return { isVisible, message, showToast }
}