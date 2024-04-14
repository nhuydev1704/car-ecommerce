'use client';

import AxiosClient from '@/apis/AxiosClient';
import dynamic from 'next/dynamic';
import React from 'react';

const BreadcrumbComponent = dynamic(() => import('@/components/app/BreadcrumbComponent'));

const IntroducePage = () => {
    const [introduce, setIntroduce] = React.useState('');

    React.useEffect(() => {
        AxiosClient.get('/introduce').then((response: any) => {
            setIntroduce(response.content);
        });
    }, []);

    return (
        <div className="flex py-[20px] justify-center">
            {introduce && (
                <div className="max-w-screen-xl space-y-4">
                    <BreadcrumbComponent title="Giới thiệu" />
                    <div className="content" dangerouslySetInnerHTML={{ __html: introduce }} />
                </div>
            )}
        </div>
    );
};

export default IntroducePage;
