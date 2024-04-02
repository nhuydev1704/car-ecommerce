'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const HeaderUser = () => {
    const pathname = usePathname();

    return (
        <ul className="menu menu-horizontal gap-2 px-1 font-semibold">
            <li className={pathname === '/' ? 'rounded-full bg-purple-400 font-bold text-[#f1f1f1]' : ''}>
                <Link href="/">Trang chủ</Link>
            </li>
            <li className={pathname === '/gioi-thieu' ? 'rounded-full bg-purple-400 font-bold text-[#f1f1f1]' : ''}>
                <Link href="/gioi-thieu">Giới thiệu</Link>
            </li>
            <li>
                <Link href="/">Liên hệ</Link>
            </li>
        </ul>
    );
};

export default HeaderUser;
