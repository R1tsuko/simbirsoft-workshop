/* eslint-disable no-console */
import classNames from 'classnames';
import { useState } from 'react';
import styles from './Carousel.module.scss';
import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import slide4 from '../../assets/images/slide4.jpg';

const Carousel = () => {
  const slides = [
    <div>
      1<img src={slide1} alt="slide" />
    </div>,
    <div>
      2<img src={slide2} alt="slide" />
    </div>,
    <div>
      3<img src={slide3} alt="slide" />
    </div>,
    <div>
      4<img src={slide4} alt="slide" />
    </div>,
  ];

  const [curSlideIndex, setCurSlideIndex] = useState(0);
  const prevSlideIndex = curSlideIndex ? curSlideIndex - 1 : slides.length - 1;
  const nextSlideIndex = (curSlideIndex + 1) % slides.length;

  const onNextArrowClick = () => setCurSlideIndex(nextSlideIndex);
  const onPrevArrowClick = () => setCurSlideIndex(prevSlideIndex);

  console.log(curSlideIndex);
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.slider}>
        <div className={classNames(styles.slide, styles.prevSlide)} key={prevSlideIndex}>
          {slides[prevSlideIndex]}
        </div>

        <div className={styles.slide} key={curSlideIndex}>
          {slides[curSlideIndex]}
        </div>

        <div className={classNames(styles.slide, styles.nextSlide)} key={nextSlideIndex}>
          {slides[nextSlideIndex]}
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.arrow} type="button" onClick={onPrevArrowClick}>
          &lt;
        </button>

        <div className={styles.dots}>...</div>

        <button
          className={classNames(styles.arrow, styles.next)}
          type="button"
          onClick={onNextArrowClick}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
