import { useEffect, useRef, useState } from 'react';
import styles from './Gasp.module.scss';
import gsap from 'gsap';

function Gasp() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);

    const h1Texts = ["Pear", "Apple", "Exotic"];
    let logoColors = [
        "var(--pear-logo)",
        "var(--apple-logo)",
        "var(--exotic-logo)"
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
        if (currentPosition > -200) {
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
    return (
        <div className={styles.body}>
            <header>
                <h2 className={styles.logo} id="logo">
                    Fruity
                </h2>
            </header>
            <main>
                <div>
                    <button id="prevButton" ref={prevButtonRef} className={`${styles.prevButton} ${currentIndex == 1 ? styles.wave_pear_effect : styles.wave_apple_effect}`} onClick={() => { prevButtonClick(); }}><i className={`${currentIndex == 1 ? styles.peach_color : styles.apple_color}`}>&lt;</i></button>
                    <button id="nextButton" ref={nextButtonRef} className={currentIndex == 1 ? styles.wave_exotic_effect : styles.wave_apple_effect} onClick={() => { nextButtonClick(); }}><i className={`${currentIndex == 1 ? styles.exotic_color : styles.apple_color}`}>&gt;</i></button>
                </div>
                <div className={styles.text}>
                    <h1 className={styles.h1} id="h1">Pear</h1>
                    <div className={styles.cane_image}>
                        <img src="https://www.yudiz.com/codepen/fruity/cane.svg" alt="" />
                        <img src="https://www.yudiz.com/codepen/fruity/Labels.jpg" alt="" id="cane_labels" className={styles.cane_labels} style={{ left: `${currentPosition}%` }} />
                    </div>
                </div>
                <div className={styles.section_container_main}>
                    <div className={styles.section_container} id="section_container" style={{ left: `${currentPosition}%` }}>
                        <section className={styles.section} id="section1">
                            <div className={styles.fruit_images}>
                                <div className={`${styles.image_one} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/pear-one.png" alt="pear-image" /></div>
                                <div className={`${styles.image_two} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/pear-two.png" alt="pear-image" /></div>
                                <div className={`${styles.image_three} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/pear-three.png" alt="pear-image" /></div>
                                <div className={`${styles.image_four} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/pear-four.png" alt="pear-image" /></div>
                            </div>
                        </section>
                        <section className={styles.section} id="section2">
                            <div className={styles.fruit_images}>
                                <div className={`${styles.image_one} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/apple-one.png" alt="apple-image" /></div>
                                <div className={`${styles.image_two} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/apple-two.png" alt="apple-image" /></div>
                                <div className={`${styles.image_three} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/apple-three.png" alt="apple-image" /></div>
                                <div className={`${styles.image_four} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/apple-four.png" alt="apple-image" /></div>
                            </div>
                        </section>
                        <section className={styles.section} id="section3">
                            <div className={styles.fruit_images}>
                                <div className={`${styles.image_one} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/exotic-one.png" alt="exotic-image" /></div>
                                <div className={`${styles.image_two} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/exotic-two.png" alt="exotic-image" /></div>
                                <div className={`${styles.image_three} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/exotic-three.png" alt="exotic-image" /></div>
                                <div className={`${styles.image_four} ${styles.fruit_image}`} ref={(ref) => fruit_image.current.push(ref as HTMLDivElement)}><img ref={(ref) => fruit_image__img.current.push(ref as HTMLImageElement)} src="https://www.yudiz.com/codepen/fruity/exotic-four.png" alt="exotic-image" /></div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Gasp