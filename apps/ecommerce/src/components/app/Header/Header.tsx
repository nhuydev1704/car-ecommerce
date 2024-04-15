'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MobileNav } from './MobileNav';
import { ProductsCommandMenu } from './ProductsCommandMenu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Header = () => {
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex h-16 items-center">
                <div className="flex items-center gap-6">
                    <Link href="/" className="hidden items-center space-x-2 lg:flex  rounded-full overflow-hidden">
                        <Image src="/icon.png" height={40} width={45} alt="logo" />
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        active={pathname === '/'}
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <span
                                            className={clsx({
                                                'font-bold': pathname === '/',
                                            })}
                                        >
                                            Trang chủ
                                        </span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/gioi-thieu" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        active={pathname === '/gioi-thieu'}
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <span
                                            className={clsx({
                                                'font-bold': pathname === '/gioi-thieu',
                                            })}
                                        >
                                            Giới thiệu
                                        </span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/lien-he" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        active={pathname === '/lien-he'}
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <span
                                            className={clsx({
                                                'font-bold': pathname === '/lien-he',
                                            })}
                                        >
                                            Liên hệ
                                        </span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <MobileNav />
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <ProductsCommandMenu />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
