'use client';
import 'react-horizontal-scrolling-menu/dist/styles.css';

import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import useDrag from '@/hooks/useDrag';
import { LeftArrow, RightArrow } from './Arrow';
import AxiosClient from '@/apis/AxiosClient';
import { Skeleton } from '@/components/ui/skeleton';
import { IconJarLogoIcon } from '@radix-ui/react-icons';
import { CarIcon, SlidersHorizontal } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

function onWheel(apiObj: any, ev: React.WheelEvent): void {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
        ev.stopPropagation();
        return;
    }

    if (ev.deltaY < 0) {
        apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
        apiObj.scrollPrev();
    }
}

const MenuCategory = () => {
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    console.log('🚀 ~ MenuCategory ~ search:');

    const [loading, setLoading] = React.useState(true);
    const [categories, setCategories] = React.useState([]);

    // NOTE: for drag by mouse
    const { dragStart, dragStop, dragMove } = useDrag();
    const handleDrag =
        ({ scrollContainer }: any) =>
        (ev: React.MouseEvent) =>
            dragMove(ev, (posDiff) => {
                if (scrollContainer.current) {
                    // eslint-disable-next-line no-param-reassign
                    scrollContainer.current.scrollLeft += posDiff;
                }
            });

    React.useEffect(() => {
        setLoading(true);
        AxiosClient.get('/category')
            .then((res) => {
                setCategories(res.data || []);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div onMouseLeave={dragStop} className="max-w-screen-xl px-[5px] py-[20px]">
            {loading ? (
                <div className="flex gap-[10px]">
                    {[...new Array(5)].map((_, index) => (
                        <Skeleton key={index} className="aspect-video w-[160px] rounded-xl" />
                    ))}
                </div>
            ) : (
                <ScrollMenu
                    LeftArrow={LeftArrow}
                    RightArrow={RightArrow}
                    onWheel={onWheel}
                    onMouseDown={() => dragStart}
                    onMouseUp={() => dragStop}
                    onMouseMove={handleDrag}
                    scrollContainerClassName="gap-2 overflow-hidden"
                    Footer={<div />}
                >
                    {[
                        {
                            id: '',
                            name: 'Tất cả',
                            logo: <SlidersHorizontal className="h-[45px] w-[30px]" />,
                        },
                        ...categories,
                    ].map(({ id, name, logo }: any) => (
                        <div
                            aria-hidden
                            onClick={() => {
                                // now you got a read/write object
                                const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

                                // update as necessary
                                const value = id;

                                if (!value) {
                                    current.delete('category_id');
                                } else {
                                    current.set('category_id', id);
                                }

                                // cast to string
                                const search = current.toString();
                                // or const query = `${'?'.repeat(search.length && 1)}${search}`;
                                const query = search ? `?${search}` : '';

                                router.push(`${pathname}${query}`, { scroll: false });
                            }}
                            className={clsx(
                                'hover:bg-gray-50 transition-all rounded-2xl flex relative cursor-pointer select-none flex-col items-center py-[10px]',
                                {
                                    'bg-sky-100': (searchParams.get('category_id') || '') === id,
                                }
                            )}
                            key={id}
                        >
                            <div className="w-[40px] flex justify-center md:w-[160px]">
                                {id ? (
                                    <img
                                        alt={name}
                                        className="pointer-events-none object-cover aspect-square h-[45px] rounded-2xl"
                                        src={logo}
                                    />
                                ) : (
                                    logo
                                )}
                            </div>
                            <p className="mt-2 text-center text-[14px] font-semibold text-[#333]">{name}</p>
                        </div>
                    ))}
                </ScrollMenu>
            )}
        </div>
    );
};

export default MenuCategory;
