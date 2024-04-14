'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const FormContact = dynamic(() => import('@/components/app/FormContact'));
const BreadcrumbComponent = dynamic(() => import('@/components/app/BreadcrumbComponent'));
const GoogleMap: any = dynamic(
    () =>
        import('@/components/app/GoogleMap').then((mod: any) => {
            return mod.default;
        }),
    {
        ssr: false,
    }
);
const ContactPage = () => {
    const [isRender, setIsRender] = React.useState(false);

    React.useEffect(() => {
        setIsRender(true);
    }, []);

    return (
        <div className="flex py-[20px] justify-center">
            <div className="max-w-screen-xl w-full space-y-4">
                {isRender && <BreadcrumbComponent title="Liên hệ" />}
                <div>
                    <h2 className="font-bold text-[14px] text-black">
                        Quý khách vui lòng điền thông tin vào form bên dưới để được hỗ trợ tốt nhất
                    </h2>

                    <div className="flex gap-[30px] py-[20px]">
                        <div className="flex-1">
                            <FormContact />
                        </div>
                        <div className="flex-1">
                            <GoogleMap basis="2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
