export const images: string[] = [
    'https://res.cloudinary.com/dejgthlwx/image/upload/c_limit,w_640/f_auto/q_auto/v1//locations/cancun_c1tw5i?_a=BAVAfVBy0',
    'https://res.cloudinary.com/dejgthlwx/image/upload/c_limit,w_640/f_auto/q_auto/v1//locations/dubai_joqiup?_a=BAVAfVBy0',
    'https://res.cloudinary.com/dejgthlwx/image/upload/c_limit,w_640/f_auto/q_auto/v1//locations/paris_tfbyw0?_a=BAVAfVBy0',
    'https://res.cloudinary.com/dejgthlwx/image/upload/c_limit,w_640/f_auto/q_auto/v1//locations/rome_g8hdhk?_a=BAVAfVBy0',
];

const imageByIndex = (index: number): string => images[index % images.length];

export const OPTIONS: any = {};
export const SLIDE_COUNT = 5;
export const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default imageByIndex;
