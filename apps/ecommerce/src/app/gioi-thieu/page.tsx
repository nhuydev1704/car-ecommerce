'use client';

import AxiosClient from '@/apis/AxiosClient';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import React from 'react';

const IntroducePage = () => {
    const [introduce, setIntroduce] = React.useState('');

    React.useEffect(() => {
        AxiosClient.get('/introduce').then((response: any) => {
            setIntroduce(response.content);
        });
    }, []);

    return (
        <div className="flex py-[20px] justify-center space-y-8">
            <div className="max-w-screen-xl">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link href="/">Trang chủ</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Giới thiệu</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="content" dangerouslySetInnerHTML={{ __html: introduce }} />
            </div>
        </div>
    );
};

export default IntroducePage;
