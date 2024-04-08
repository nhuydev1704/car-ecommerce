'use client';

import AxiosClient from '@/apis/AxiosClient';
import React from 'react';
import ProductItem from './Product.Item';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const Product = () => {
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        AxiosClient.get('/product')
            .then((res) => {
                setProducts(res.data);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="grid w-full max-w-screen-xl grid-cols-4 gap-[15px] mt-[40px]">
                {loading
                    ? [...new Array(8)].map((_, index) => (
                          <div key={index}>
                              <Skeleton key={index} className="aspect-video w-full rounded-xl" />
                              <div className="flex flex-col gap-2 py-[10px] px-2">
                                  <Skeleton key={index} className="h-[5px] w-[40px] rounded-sm" />
                                  <Skeleton key={index} className="h-[5px] w-[80px] rounded-sm" />
                              </div>
                          </div>
                      ))
                    : products.map((product: any) => <ProductItem key={product.id} product={product} />)}
            </div>
            {!loading && (
                <div className="flex justify-center mt-[40px]">
                    <Button>Xem thêm</Button>
                </div>
            )}
        </div>
    );
};

export default Product;