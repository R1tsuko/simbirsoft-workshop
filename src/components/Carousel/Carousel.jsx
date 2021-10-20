/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import classNames from 'classnames';
import styles from './Carousel.module.scss';
import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import slide4 from '../../assets/images/slide4.jpg';
import arrowLeft from '../../assets/icons/ArrowLeft.svg';
import arrowRight from '../../assets/icons/ArrowRight.svg';

const slidesData = [
  {
    backgroundImg: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${slide1})`,
    title: 'Бесплатная парковка',
    text: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
    actionStyle: styles.action1,
  },
  {
    backgroundImg: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${slide2})`,
    title: 'Страховка',
    text: 'Полная страховка автомобиля',
    actionStyle: styles.action2,
  },
  {
    backgroundImg: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${slide3})`,
    title: 'Бензин',
    text: 'Полный бак на любой заправке города за наш счёт',
    actionStyle: styles.action3,
  },
  {
    backgroundImg: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${slide4})`,
    title: 'Обслуживание',
    text: 'Автомобиль проходит еженедельное ТО',
    actionStyle: styles.action4,
  },
];

const Slide = ({ title, text, backgroundImg, actionStyle }) => {
  return (
    <div
      className={styles.slide}
      style={{
        backgroundImage: backgroundImg,
      }}
    >
      <section className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <button className={classNames(styles.action, actionStyle)} type="button">
          Подробнее
        </button>
      </section>
    </div>
  );
};

const Carousel = () => {
  const [curSlideIndex, setCurSlideIndex] = useState(0);
  const prevSlideIndex = curSlideIndex ? curSlideIndex - 1 : slidesData.length - 1;
  const nextSlideIndex = (curSlideIndex + 1) % slidesData.length;

  const onControlClick = (slideIndex) => () => setCurSlideIndex(slideIndex);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.slider}>
        <div className={classNames(styles.slideWrapper, styles.prevSlide)} key={prevSlideIndex}>
          <Slide {...slidesData[prevSlideIndex]} />
        </div>

        <div className={styles.slideWrapper} key={curSlideIndex}>
          <Slide {...slidesData[curSlideIndex]} />
        </div>

        <div className={classNames(styles.slideWrapper, styles.nextSlide)} key={nextSlideIndex}>
          <Slide {...slidesData[nextSlideIndex]} />
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.arrow} type="button" onClick={onControlClick(prevSlideIndex)}>
          <img className={styles.arrowIcon} src={arrowLeft} alt="prev" />
        </button>

        <div className={styles.dots}>
          {slidesData.map((el, i) => (
            <button
              className={classNames(styles.dot, {
                [styles.active]: i === curSlideIndex,
              })}
              type="button"
              aria-label="slide dot"
              onClick={onControlClick(i)}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
            />
          ))}
        </div>

        <button className={styles.arrow} type="button" onClick={onControlClick(nextSlideIndex)}>
          <img className={styles.arrowIcon} src={arrowRight} alt="next" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
