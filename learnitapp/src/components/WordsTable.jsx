import React, { useState } from "react";
import InputForm from "./InputForm";

export default function WordsTable({ words, loadWords, setIsLoading }) {

    const { english, russian, transcription, tags, id } = words;
    const [isSelected, toggleSelected] = useState(false);
    const [error, setError] = useState({
        russian: false,
        english: false,
        transcription: false,
        tags: false,
    });
    
    const [value, setValue] = useState({
        id: id,
        russian: russian,
        english: english,
        transcription: transcription,
        tags: tags,
    });

    const funcDelete = () => {
        setIsLoading(true)
        fetch(`/api/words/${id}/delete`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Что-то пошло не так');
                }
            })
            .then(loadWords)
            setIsLoading(false)
    };

    return (
        <>
            {isSelected ? (<InputForm
                words={words} id={id}
                loadWords={loadWords}
                toggleSelected={toggleSelected}
                setError={setError} error={error}
                setValue={setValue} value={value} />)
                : (<tr className="table" >
                    <td className="table__text">{value.english}</td>
                    <td className="table__text">{value.transcription}</td>
                    <td className="table__text">{value.russian}</td>
                    <td className="table__text">{value.tags}</td>
                    <td className="table__button">
                        <button className="table__button-btn" onClick={() => { toggleSelected(true) }}>Edit</button>
                        <button className="table__button-btn" onClick={funcDelete}>Delete</button></td>
                </tr>)}
        </>
    )
}