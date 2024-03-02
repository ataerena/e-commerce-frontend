/* eslint-disable @next/next/no-img-element */
import carousel from '../styles/modules/carousel.module.scss';
import { useRouter } from 'next/router';

export default function CarouselImage({ image }) {
    const router = useRouter();
    const goToPage = (route) => {
        router.push(route);
    }

    return (
        <>
            <div className={carousel.default} onClick={() => goToPage(image.route)}>
                <img src={image.src} alt={image.alt} className={carousel.image}/>
                <div className={carousel.caption}>
                    {image.caption}
                </div>
                <div className={carousel.label}>
                    {image.label}
                </div>
                <div className={carousel.text}>
                    {image.text}
                </div>
            </div>
        </>
    )
}