import { MapPinIcon, PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 rounded-lg m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex items-start sm:justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Link
                                href="/"
                                className="hidden items-center space-x-2 lg:flex  rounded-full overflow-hidden"
                            >
                                <Image src="/icon.png" height={40} width={45} alt="logo" />
                            </Link>
                            <h3 className="font-semibold">Chợ Ô Tô Xứ Đoài</h3>
                        </div>
                        <div className="flex items-center gap-2 text-[14px]">
                            <MapPinIcon className="h-4 w-4" />{' '}
                            <p className="font-semibold">316A Đ. Nguyễn Xiển, Đại Kim, Thanh Xuân, Hà Nội 100000</p>
                        </div>
                        <div className="flex items-center gap-2 text-[14px]">
                            <PhoneIcon className="h-4 w-4" /> <p className="font-semibold">0973641046</p>
                        </div>
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-semibold text-gray-500 sm:mb-0">
                        <li>
                            <Link href="/" className="hover:underline me-4 md:me-6">
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link href="/gioi-thieu" className="hover:underline me-4 md:me-6">
                                Giới thiệu
                            </Link>
                        </li>
                        <li>
                            <Link href="/lien-he" className="hover:underline me-4 md:me-6">
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">
                    © Bản quyền thuộc về Chợ Ô Tô Xứ Đoài - Chuyên mua bán ô tô
                </span>
            </div>
        </footer>
    );
};

export default Footer;
