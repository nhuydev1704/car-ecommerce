import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isMacOs() {
    if (typeof window === 'undefined') return false;

    return window.navigator.userAgent.includes('Mac');
}

export function formatPrice(price: number | string, options: Intl.NumberFormatOptions = {}) {
    return new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: options.currency ?? 'VND',
        notation: options.notation ?? 'compact',
        ...options,
    }).format(Number(price));
}

export const currencyFormat = (number: number) => {
    return number?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};
