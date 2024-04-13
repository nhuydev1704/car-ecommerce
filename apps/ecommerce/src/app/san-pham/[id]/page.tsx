'use client';

import AxiosClient from '@/apis/AxiosClient';
import ProductItem from '@/components/app/Product/Product.Item';
import { ProductImageCarousel } from '@/components/product-image-carousel';
import { Shell } from '@/components/shell';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { UpdateProductRatingButton } from '@/components/update-product-rating-button';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { Rating } from 'react-simple-star-rating';

// eslint-disable-next-line @next/next/no-async-client-component
async function DetailProductPage() {
    const param: any = useParams();

    const [relatedProducts, setRelatedProducts] = React.useState([]);

    const [productDetail, setProductDetail] = React.useState({
        name: '',
        attribute: '',
        description: '',
        id: '',
        images: '',
        category_id: '',
        price: 0,
    });
    console.log('🚀 ~ DetailProductPage ~ productDetail:', productDetail);

    React.useEffect(() => {
        if (param.id) {
            const id = param.id.split('-').pop();
            AxiosClient.get(`/product/${id}`).then((response: any) => {
                setProductDetail(response);
            });
        }
    }, [param.id]);

    React.useEffect(() => {
        if (productDetail.id) {
            AxiosClient.get('/product', {
                params: {
                    page: 1,
                    limit: 4,
                    category_id: productDetail.category_id,
                },
            }).then((res) => {
                setRelatedProducts(res.data);
            });
        }
    }, [productDetail.id]);

    if (!productDetail.id) {
        return null;
    }

    return (
        <Shell className="pb-12 md:pb-14">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/">Trang chủ</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{productDetail.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col gap-8 md:flex-row md:gap-16">
                <ProductImageCarousel
                    className="w-full md:w-1/2"
                    images={productDetail.images.split(',').map((image: string) => ({
                        name: image,
                        url: image,
                    }))}
                    options={{
                        loop: true,
                    }}
                />
                <Separator className="mt-4 md:hidden" />
                <div className="flex w-full flex-col gap-4 md:w-2/3">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <h2 className="line-clamp-1 text-2xl font-bold">{productDetail?.name}</h2>
                            <UpdateProductRatingButton productId={'14'} rating={4} />
                        </div>
                        <p className="text-base text-muted-foreground">{formatPrice(productDetail.price)}</p>
                    </div>
                    <Separator />
                    <Accordion type="single" collapsible className="w-full" defaultValue="description">
                        <AccordionItem value="description" className="border-none">
                            <AccordionTrigger className="font-bold text-[16px]">Thuộc tính</AccordionTrigger>
                            <AccordionContent>
                                <div
                                    className="content"
                                    dangerouslySetInnerHTML={{
                                        __html: productDetail.attribute || 'Không có thuộc tính cho sản phẩm.',
                                    }}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Separator className="md:hidden" />
                </div>
            </div>
            <div className="font-bold text-[16px] space-y-4">
                <h2 className="line-clamp-1 flex-1 text-xl font-bold">Mô tả chi tiết</h2>
                <div
                    className="content"
                    dangerouslySetInnerHTML={{
                        __html: productDetail.description || 'Không có mô tả cho sản phẩm.',
                    }}
                />
            </div>
            {relatedProducts && relatedProducts.length > 0 ? (
                <div className="space-y-4 overflow-hidden mt-4">
                    <h2 className="line-clamp-1 flex-1 text-xl font-bold">Sản phẩm tương tự</h2>
                    <div className="grid grid-cols-4 gap-[15px] pb-4">
                        {relatedProducts.map((product: any) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            ) : null}
        </Shell>
    );
}

export default DetailProductPage;
