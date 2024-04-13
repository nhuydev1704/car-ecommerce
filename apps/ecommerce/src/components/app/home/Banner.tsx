'use client';

import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

function Banner() {
    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <div className="py-[20px]">
            <Carousel
                plugins={[plugin.current]}
                className="container"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {['/banner1.jpeg', '/banner2.jpeg', '/banner3.jpeg'].map((_: any, index: any) => (
                        <CarouselItem key={index}>
                            <div>
                                <div className="w-full aspect-[16/7]">
                                    <img className="h-full rounded-2xl w-full object-cover" alt={_} src={_} />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default React.memo(Banner);
