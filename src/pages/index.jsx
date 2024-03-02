/* eslint-disable @next/next/no-img-element */
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import CarouselImage from '../layouts/CarouselImage';

import { useTranslations } from 'next-intl';

import home from '../styles/modules/home.module.css';
import carousel from '../styles/modules/carousel.module.scss'

export default function Home() {
  const t = useTranslations('home.carousel');
  const images = [
    {
        route: '/',
        src: '/images/special_offers.png',
        alt: 'Special Offers',
        caption: t('_01.caption'), 
        label: t('_01.label'),
        text: t('_01.text')
    },
    {
        route: '/',
        src: '/images/retail_promo.png',
        alt: 'Retail Shop',
        caption: t('_02.caption'), 
        label: t('_02.label'),
        text: t('_02.text')
    },
    {
        route: '/',
        src: '/images/socials.png',
        alt: 'Social Media',
        caption: t('_03.caption'), 
        label: t('_03.label'),
        text: t('_03.text')
    },
  ]


  return (
    <div className={`${home.shape} ${home.light}`}>
      <Carousel
        variant='light'
        className={carousel.wrapper}
      >
        {images.map((item, index) => (
          <Carousel.Item key={index}>
            <CarouselImage image={item}></CarouselImage>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const messages = (await import(`../../messages/${context.locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};