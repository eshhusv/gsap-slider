import { useEffect, useRef, useState } from 'react';
import styles from './Gasp.module.scss';
import gsap from 'gsap';

import beercan from '../../assets/beercan.png';
import beerlables from '../../assets/beerslables.png';

import malt1 from '../../assets/malt1.png';
import malt2 from '../../assets/malt2.png';
import malt3 from '../../assets/malt3.png';
import malt4 from '../../assets/malt4.png';
import malt5 from '../../assets/malt5.png';
import malt6 from '../../assets/malt6.png';
import malt7 from '../../assets/malt7.png';
import malt8 from '../../assets/malt8.png';

import hops1 from '../../assets/hops1.png';
import hops2 from '../../assets/hops2.png';
import hops3 from '../../assets/hops3.png';
import hops4 from '../../assets/hops4.png';
import hops5 from '../../assets/hops5.png';
import hops6 from '../../assets/hops6.png';
import hops7 from '../../assets/hops7.png';
import hops8 from '../../assets/hops8.png';


function Gasp() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);

    const h1Texts = ["Beer one", "Beer two", "Beer three", "Beer four"];
    let logoColors = [
        "var(--pear-logo)",
        "var(--apple-logo)",
        "var(--exotic-logo)",
        "var(--four-logo)"
    ];
    const prevButtonRef = useRef<HTMLButtonElement>(null);
    const prevButton = document.getElementById("prevButton") as HTMLDivElement;
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const nextButton = document.getElementById("nextButton") as HTMLDivElement;
    const caneLabels = document.getElementById("cane_labels");
    const sectionContainer = document.getElementById("section_container");
    const logo = document.getElementById("logo");
    const h1 = document.getElementById("h1");
    const fruit_image = useRef<(HTMLDivElement | null)[]>([]);
    const fruit_image__img = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // логика анимации фруктов на заднем фоне
        gsap.to(fruit_image__img.current, {
            x: "random(-20, 20)",
            y: "random(-20, 20)",
            zIndex: 22,
            duration: 2,
            ease: "none",
            yoyo: true,
            repeat: -1
        });

        // логика текста h1 в зависимости от индекса
        if (currentIndex >= 0) {
            if (h1 !== null) {
                h1.innerHTML = h1Texts[currentIndex];
            }
        }

        // цвет лого
        if (logo !== null) {
            logo.style.color = logoColors[currentIndex];
        }

        // логика скрытия кнопки nextButton 
        if (currentIndex === h1Texts.length - 1 && nextButton !== null) {
            nextButton.style.display = "none";
        }

        // логика появления кнопки nextButton
        if (currentIndex < h1Texts.length - 1 && nextButton !== null) {
            nextButton.style.display = "block";
        }

        // логика скрытия кнопки prevButton
        if (currentIndex === 0 && prevButton !== null) {
            prevButton.style.display = "none";
        }

        // логика появления кнопки prevButton
        if (currentIndex > 0 && prevButton !== null) {
            prevButton.style.display = "block";
        }
    }, [currentIndex]);


    const nextButtonClick = () => {
        if (currentPosition > -300) {
            setCurrentPosition(currentPosition - 100);
            if (caneLabels !== null && sectionContainer !== null) {
                caneLabels.style.left = `${currentPosition}%`;
                sectionContainer.style.left = `${currentPosition}%`;
            }

            // ограничение на нажатие кнопки, чтобы не съезжали фркуты
            const nextButtonCurrent = nextButtonRef.current;
            if (nextButtonCurrent) {
                nextButtonCurrent.setAttribute("disabled", "");
                setTimeout(() => {
                    nextButtonCurrent.removeAttribute("disabled");
                }, 850);
            }
        }

        setCurrentIndex(currentIndex + 1);

        // появление фруктов сверху
        gsap.from(fruit_image.current, { y: "-100vh", delay: 0.5 });
    };
    const prevButtonClick = () => {
        if (currentPosition < 0) {
            setCurrentPosition(currentPosition + 100);
            if (caneLabels !== null && sectionContainer !== null) {
                caneLabels.style.left = `${currentPosition}%`;
                sectionContainer.style.left = `${currentPosition}%`;
                sectionContainer.style.transition = `all 0.5s ease-in-out`;
            }

            // ограничение на нажатие кнопки, чтобы не съезжали фркуты
            const prevButtonCurrent = prevButtonRef.current;
            if (prevButtonCurrent) {
                prevButtonCurrent.setAttribute("disabled", "");
                setTimeout(() => {
                    prevButtonCurrent.removeAttribute("disabled");
                }, 850);
            }
        }

        setCurrentIndex(currentIndex - 1);

        // появление фруктов снизу
        gsap.from(fruit_image.current, { y: "100vh", delay: 0.5 });
    };

    const conditionforleft1 = currentIndex == 1 ? styles.wave_pear_effect : styles.wave_apple_effect;
    const conditionforleft2 = currentIndex == 2 ? styles.wave_apple_effect : styles.wave_exotic_effect;
    const conditionforright1 = currentIndex == 1 ? styles.wave_exotic_effect : styles.wave_apple_effect;
    const conditionforright2 = currentIndex == 2 ? styles.wave_four_effect : styles.wave_apple_effect;

    return (
        <div className={styles.body}>
            <header>
                <h2 className={styles.logo} id="logo">
                    Ponarth
                </h2>
            </header>
            <main>
                <div>
                    <button id="prevButton" ref={prevButtonRef} className={`${styles.prevButton} ${conditionforleft1} ${conditionforleft2}`} onClick={() => { prevButtonClick(); }}><i className={`${currentIndex == 1 ? styles.peach_color : styles.apple_color}`}>&lt;</i></button>
                    <button id="nextButton" ref={nextButtonRef} className={`${conditionforright1} ${conditionforright2}`} onClick={() => { nextButtonClick(); }}><i className={`${currentIndex == 1 ? styles.exotic_color : styles.apple_color}`}>&gt;</i></button>
                </div>
                <div className={styles.text}>
                    <h1 className={styles.h1} id="h1">Beer 1</h1>
                    <div className={styles.cane_image}>
                        <img src={beercan} alt="" className={styles.can} />
                        <img src={beerlables} alt="" id="cane_labels" className={styles.cane_labels} style={{ left: `${currentPosition}%` }} />
                    </div>
                </div>
                <div className={styles.section_container_main}>
                    <div className={styles.section_container} id="section_container" style={{ left: `${currentPosition}%` }}>
                        <section className={styles.section} id="section1">
                            <div className={styles.fruit_images}>
                                <div className={`${styles.image_one} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={malt1} alt="pear-image" /></div>
                                <div className={`${styles.image_two} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={malt2} alt="pear-image" /></div>
                                <div className={`${styles.image_three} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={malt3} alt="pear-image" /></div>
                                <div className={`${styles.image_four} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={malt4} alt="pear-image" /></div>
                            </div>
                        </section>
                        <section className={styles.section} id="section2">
                            <div className={styles.fruit_images}>
                                <div className={`${styles.image_one} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={hops1} alt="apple-image" /></div>
                                <div className={`${styles.image_two} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={hops2} alt="apple-image" /></div>
                                <div className={`${styles.image_three} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={hops3} alt="apple-image" /></div>
                                <div className={`${styles.image_four} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={hops4} alt="apple-image" /></div>
                            </div>
                        </section>
                        <section className={styles.section} id="section3">
                            <div className={styles.fruit_images}>
                                <div className={`${styles.image_one} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={malt5} alt="exotic-image" /></div>
                                <div className={`${styles.image_two} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={malt6} alt="exotic-image" /></div>
                                <div className={`${styles.image_three} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={malt7} alt="exotic-image" /></div>
                                <div className={`${styles.image_four} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={malt8} alt="exotic-image" /></div>
                            </div>
                        </section>
                        <section className={styles.section} id="section4">
                            <div className={styles.fruit_images}>
                                <div className={`${styles.image_one} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={hops5} alt="exotic-image" /></div>
                                <div className={`${styles.image_two} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={hops6} alt="exotic-image" /></div>
                                <div className={`${styles.image_three} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={hops7} alt="exotic-image" /></div>
                                <div className={`${styles.image_four} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src={hops8} alt="exotic-image" /></div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Gasp