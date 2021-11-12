import React, { useEffect, useRef, useState } from "react";

const CardSlider =  ({words }) => {
    
    const ref = useRef();
    useEffect(() => ref.current.focus(), []);

    const [position, setPosition] = useState(0)
    const [pushed, setPushed] = useState(false);
    const [learned, setLearned] = useState(0)
    
    const prevCardHandler = () => {
        if (position > 0) {
            setPosition(position - 1)
        }
    };

    const nextCardHandler = () => {
        if (position >= words.length - 1) {
            setPosition(0)
        } else {
            setPosition(position + 1)
            setPushed(false)
        }
    };

    const btnTranslate = () => {
        setPushed(true);
        setLearned(learned + 1);
    }
    
    return (
        < div className="slider" >
            <div className="slider-container">
                <button className="slider-container__btn" onClick={prevCardHandler}>prev</button>
                <div className="card">
                    <div className="card__word">{words[position].english}</div>
                    <div className="card__scription">{words[position].transcription}</div>{
                        pushed ? (<div className="card__translate">{words[position].russian}</div>)
                            : (<div className="card__button"><button className="card__button-add" ref={ref} onClick={btnTranslate}>Показать перевод</button></div>)}
                </div>
                <button className="slider-container__btn" onClick={nextCardHandler}>next</button>
            </div>
            <div className="slider-numbers">{position + 1} / {words.length}</div>
            <div className="slider-numbers">Изучено слов: {learned}</div>
        </div >
    )
};

export default CardSlider;