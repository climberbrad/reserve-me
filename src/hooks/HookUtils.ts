export function wait (duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

export const formatDate = (utc: number): string => {
    const date = new Date(utc)

    return `${date.getMonth() + 1}/${date.getDate() + 1}`
}