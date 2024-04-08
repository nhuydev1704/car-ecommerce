'use client';

import AxiosClient from '@/apis/AxiosClient';
import React from 'react';

const IntroducePage = () => {
    const [introduce, setIntroduce] = React.useState('');

    React.useEffect(() => {
        AxiosClient.get('/introduce').then((response: any) => {
            setIntroduce(response.content);
        });
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: introduce }} />;
};

export default IntroducePage;
