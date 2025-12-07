export const useDebounce = <T extends unknown[]>(
    callback: (...args: T) => void,
    delay: number
) => {
    let timer: ReturnType<typeof setTimeout>
    return (...args: T) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            callback.call(null, ...args)
        }, delay)
    }
}
