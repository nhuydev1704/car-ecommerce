'use client';

import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

function Banner() {
    const plugin = React.useRef(Autoplay({ delay: 8000, stopOnInteraction: true }));

    return (
        <div className="py-[20px]">
            <Carousel
                plugins={[plugin.current]}
                className="container"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {[
                        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg',
                        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg',
                        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg',
                        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg',
                    ].map((_, index) => (
                        <CarouselItem key={index}>
                            <div>
                                <div className="w-full aspect-[16/6]">
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
