'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import AxiosClient from '@/apis/AxiosClient';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/use-debounce';
import { cn, currencyFormat } from '@/lib/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type ProductGroup = NonNullable<Awaited<ReturnType<any>>['data']>[number];

export function ProductsCommandMenu() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const debouncedQuery = useDebounce(query, 300);
    const [data, setData] = React.useState<ProductGroup[] | null>(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (debouncedQuery.length <= 0) {
            setData(null);
            return;
        }

        async function fetchData() {
            setLoading(true);
            AxiosClient.get('/product', {
                params: {
                    name: debouncedQuery,
                },
            })
                .then((res: any) => {
                    setData(res.data);
                })
                .finally(() => setLoading(false));
        }

        void fetchData();
    }, [debouncedQuery]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSelect = React.useCallback((callback: () => unknown) => {
        setOpen(false);
        callback();
    }, []);

    return (
        <>
            <Button
                variant="outline"
                className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
                onClick={() => setOpen(true)}
            >
                <MagnifyingGlassIcon className="size-4 xl:mr-2" aria-hidden="true" />
                <span className="hidden xl:inline-flex">Tìm kiếm sản phẩm...</span>
                <span className="sr-only">Tìm kiếm sản phẩm</span>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={(open) => {
                    setOpen(open);
                    if (!open) {
                        setQuery('');
                    }
                }}
                // className="top-48 translate-y-0"
            >
                <CommandInput placeholder="Tìm kiếm sản phẩm..." value={query} onValueChange={setQuery} />
                <CommandList>
                    {(data?.length === 0 || !query) && (
                        <CommandEmpty className={cn(loading ? 'hidden' : 'py-6 text-center text-sm')}>
                            Danh sách trống.
                        </CommandEmpty>
                    )}
                    {loading ? (
                        <div className="space-y-1 overflow-hidden px-1 py-2">
                            <Skeleton className="h-4 w-10 rounded" />
                            <Skeleton className="h-8 rounded-sm" />
                            <Skeleton className="h-8 rounded-sm" />
                        </div>
                    ) : (
                        <div>
                            {data?.map((product) => (
                                <div
                                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                                    key={product.id}
                                    onClick={() => handleSelect(() => router.push(`/san-pham/${product.id}`))}
                                >
                                    <div className="w-[60px]">
                                        <LazyLoadImage
                                            onError={(e: any) => {
                                                e.target.onerror = null;
                                                e.target.src = `/error.png`;
                                            }}
                                            placeholderSrc={`/error.png`}
                                            data-src={product.images.split(',')[0]}
                                            data-alt={product.images.split(',')[0]}
                                            effect="blur"
                                            src={product.images.split(',')[0]}
                                            alt={product.images.split(',')[0]}
                                            className="transition-all h-full group-hover:scale-105 w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="truncate font-bold">{product.name}</span>
                                        <p className="font-bold mt-[4px] text-red-500">
                                            {currencyFormat(product.price)} VND
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
}
