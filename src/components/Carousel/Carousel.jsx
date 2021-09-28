/* eslint-disable no-console */
import classNames from 'classnames';
import { useState } from 'react';
import styles from './Carousel.module.scss';
import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import slide4 from '../../assets/images/slide4.jpg';
import arrowLeft from '../../assets/icons/ArrowLeft.svg';
import arrowRight from '../../assets/icons/ArrowRight.svg';

const slides = [
  <div
    className={styles.slide}
    style={{
      backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${slide1})`,
    }}
  >
    <section className={styles.content}>
      <h2 className={styles.title}>Бесплатная парковка</h2>
      <p className={styles.text}>
        Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а
        также в аэропортах.
      </p>
      <button className={classNames(styles.action, styles.action1)} type="button">
        Подробнее
      </button>
    </section>
  </div>,
  <div
    className={styles.slide}
    style={{
      backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${slide2})`,
    }}
  >
    <section className={styles.content}>
      <h2 className={styles.title}>Страховка</h2>
      <p className={styles.text}>Полная страховка автомобиля</p>
      <button className={classNames(styles.action, styles.action2)} type="button">
        Подробнее
      </button>
    </section>
  </div>,
  <div
    className={styles.slide}
    style={{
      backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${slide3})`,
    }}
  >
    <section className={styles.content}>
      <h2 className={styles.title}>Бензин</h2>
      <p className={styles.text}>Полный бак на любой заправке города за наш счёт</p>
      <button className={classNames(styles.action, styles.action3)} type="button">
        Подробнее
      </button>
    </section>
  </div>,
  <div
    className={styles.slide}
    style={{
      backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${slide4})`,
    }}
  >
    <section className={styles.content}>
      <h2 className={styles.title}>Обслуживание</h2>
      <p className={styles.text}>Автомобиль проходит еженедельное ТО</p>
      <button className={classNames(styles.action, styles.action4)} type="button">
        Подробнее
      </button>
    </section>
  </div>,
];

const Carousel = () => {
  const [curSlideIndex, setCurSlideIndex] = useState(0);
  const prevSlideIndex = curSlideIndex ? curSlideIndex - 1 : slides.length - 1;
  const nextSlideIndex = (curSlideIndex + 1) % slides.length;

  const onControlClick = (slideIndex) => () => setCurSlideIndex(slideIndex);

  console.log(curSlideIndex);
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.slider}>
        <div className={classNames(styles.slideWrapper, styles.prevSlide)} key={prevSlideIndex}>
          {slides[prevSlideIndex]}
        </div>

        <div className={styles.slideWrapper} key={curSlideIndex}>
          {slides[curSlideIndex]}
        </div>

        <div className={classNames(styles.slideWrapper, styles.nextSlide)} key={nextSlideIndex}>
          {slides[nextSlideIndex]}
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.arrow} type="button" onClick={onControlClick(prevSlideIndex)}>
          <img className={styles.arrowIcon} src={arrowLeft} alt="prev" />
        </button>

        <div className={styles.dots}>
          {slides.map((el, i) => (
            <button
              className={classNames(styles.dot, {
                [styles.active]: i === curSlideIndex,
              })}
              type="button"
              aria-label="slide dot"
              onClick={onControlClick(i)}
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
