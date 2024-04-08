'use client';

import { Button } from '@/components/ui/button';
import { ArrowRightIcon, SunIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = ({ product }: { product: any }) => {
    return (
        <div className="overflow-hidden rounded-2xl shadow-md cursor-pointer group">
            <div className="relative overflow-hidden aspect-[16/10]">
                {/* <Image layout="fill" objectFit="cover" alt="product item" src={product.images.split(',')[0]} /> */}
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
                    className="transition-all h-full group-hover:scale-105 w-full aspect-[16/10] object-cover"
                />
            </div>
            <div className="px-[15px] py-[10px]">
                <div className="flex items-center">
                    <Rating className="mt-1" initialValue={0.8} allowFraction iconsCount={1} size={22} readonly />
                    <p className="ms-1 text-xs font-bold text-gray-900">4.95</p>
                    <span className="mx-1.5 size-1 rounded-full bg-gray-500" />
                    <div className="text-xs font-medium text-gray-900 underline">73 reviews</div>
                </div>
                <div className="text-[14px] font-bold">Red Mazda 6 - Elite Estate</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1">
                        <SunIcon />
                        <span className="text-[12px] font-semibold">Xăng 2.4L</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <SunIcon />
                        <span className="text-[12px] font-semibold">Xăng 2.4L</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <SunIcon />
                        <span className="text-[12px] font-semibold">Xăng 2.4L</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <SunIcon />
                        <span className="text-[12px] font-semibold">Xăng 2.4L</span>
                    </div>
                </div>

                <div className="flex justify-between pt-[10px]">
                    <div />
                    <Button size="sm" variant="ghost" className="flex font-semibold gap-2">
                        Xem ngay
                        <ArrowRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductItem);
