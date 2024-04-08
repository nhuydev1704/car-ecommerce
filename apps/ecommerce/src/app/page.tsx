import Banner from '@/components/app/home/Banner';
import MenuCategory from '@/components/app/MenuCategory/MenuCategory';
import Product from '@/components/app/Product/Product';
import ProductItem from '@/components/app/Product/Product.Item';
import QA from '@/components/app/QA/QA';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React from 'react';

export default function Home() {
    return (
        <React.Suspense fallback={<Skeleton className="h-7 w-44" />}>
            <Banner />
            <div className="mb-2 w-full pt-[30px] text-center text-[22px] font-bold uppercase">Xe đang bán</div>
            <div className="flex w-full justify-center">
                <MenuCategory />
            </div>
            <div className="my-[10px] flex w-full justify-center">
                <Product />
            </div>
            <QA />
        </React.Suspense>
    );
}
