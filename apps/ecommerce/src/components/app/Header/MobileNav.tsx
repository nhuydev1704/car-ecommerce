'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { MenuIcon } from 'lucide-react';

export function MobileNav() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const segment = useSelectedLayoutSegment();
    const [open, setOpen] = React.useState(false);

    if (isDesktop) return null;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-5 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
                >
                    {/* <Icons.menu aria-hidden="true" /> */}
                    <MenuIcon />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pl-1 pr-0 pt-9">
                <div className="w-full px-7">
                    <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                        <Image src="/icon.png" height={40} width={45} alt="logo" />

                        <span className="font-bold">siteConfig name</span>
                        <span className="sr-only">Home</span>
                    </Link>
                </div>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="pl-1 pr-7">
                        <MobileLink href="/" segment={String(segment)} setOpen={setOpen} className="m-1">
                            Trang chủ
                        </MobileLink>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

interface MobileLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    disabled?: boolean;
    segment: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({ children, href, disabled, segment, setOpen, className, ...props }: MobileLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                'text-foreground/70 transition-colors hover:text-foreground',
                href.includes(segment) && 'text-foreground',
                disabled && 'pointer-events-none opacity-60',
                className
            )}
            onClick={() => setOpen(false)}
            {...props}
        >
            {children}
        </Link>
    );
}
