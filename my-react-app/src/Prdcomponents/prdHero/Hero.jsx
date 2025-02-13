import React , {useState }from "react";

import styles from "./Hero.module.css";
import imagem from "../../../assests/product_image1.avif";
import pep1 from "../../../assests/pep.jpg";
import pfp from "../../../assests/propfp.jpg";
import pep2 from "../../../assests/pep2.jpg";
import pep3 from "../../../assests/pep3.jpg";
import imagem2 from "../../../assests/product_image2.jpeg";
import imagem3 from "../../../assests/product_image3.jpeg";



export const Hero = () => {

  const sliderImages = [imagem , imagem2 , imagem3];
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className={styles.all}>
      <section className={styles.container}>
        <div className={styles.leftside}>
          <img src={pfp} alt="Hero image of me" className={styles.heroImg} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Remy AI</h1>
          <p className={styles.description}>
            Remy is a charismatic AI sleep coach who takes care of everything about your sleep from your sleep metrics and circadian rhythms to evening routines and sleep environment. Truly, backed by science.        </p>
          <div className={styles.investor_type}>
            <div className={styles.investor_list}>
              <button className={styles.tag}>Artificial Intelligence</button>
              <button className={styles.tag}>Health & Fitness</button>
              <button className={styles.tag}>iOS</button>
              <button className={styles.tag}>Hedge Fund</button>
              <button className={styles.tag}>Impact Investor</button>
            </div>
          </div>
        </div>
        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
      </section>

      <div className={styles.imageSlider}>
        {sliderImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={styles.sliderImage}
          />
        ))}
      </div>


      <section className={styles.container2} id="about">
        <h2 className={styles.title2}>Meet the Team</h2>
        <br></br>

        <div className={styles.team}>
        <div className={styles.content2}>
              <img src={pep1} alt="Hero image of me" className={styles.teamImg2} />
              <ul className={styles.aboutItems2}>
                <li className={styles.aboutItem2}>
                  <div className={styles.aboutItemText2}>
                    <h3>Maria langford</h3>
                    <p>Founder at Remy</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.content2}>
              <img src={pep2} alt="Hero image of me" className={styles.teamImg2} />
              <ul className={styles.aboutItems2}>
                <li className={styles.aboutItem2}>
                  <div className={styles.aboutItemText2}>
                    <h3>Jonathan Bailey</h3>
                    <p>Co-Founder at Remy</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.content2}>
              <img src={pep3} alt="Hero image of me" className={styles.teamImg2} />
              <ul className={styles.aboutItems2}>
                <li className={styles.aboutItem2}>
                  <div className={styles.aboutItemText2}>
                    <h3>Steve Madden</h3>
                    <p>Co-Founder at Remy</p>
                  </div>
                </li>
              </ul>
            </div>
            </div>

      </section>





    </div>



  );
};