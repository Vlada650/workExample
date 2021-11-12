import React from "react"; 

export default function InputForm({ id, words, loadWords, toggleSelected, setError, setValue, error, value }) {
    
   const btnDisabled = Object.values(error).some(el => el);

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: !e.target.value.trim() })
    };

    const validateFunc = () => {
        if (value.english.match(/[А-Яа-яЁё]/gm)) {
            setError({ ...error, english: 'Только латинские буквы' })
        } else if (value.russian.match(/[A-Za-z]/gm)) {
            setError({ ...error, russian: 'Только русские буквы' })
        } else if (value.transcription.match(/[А-Яа-яЁё]/gm)) {
            setError({ ...error, transcription: 'Только латинские буквы' })
        } else {
            console.log("ok")
        }
    }

    const funcCancel = () => {
        toggleSelected(false)
        setValue({ ...words })
        setError(false)
    };

    const funcSave = () => {
        toggleSelected(false);
        fetch(`/api/words/${id}/update`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                english: value.english,
                russian: value.russian,
                transcription: value.transcription,
                tags: value.tags
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Что-то пошло не так');
                }
            })
            .then(loadWords)
    }
    
    return (
    <tr className="table" >
        <td className="table__text">
            <input type="text" name={'english'} value={value.english}
                onChange={handleChange} onBlur={validateFunc}
                className={error.english ? 'errorinput' : " "}
            /><span><br />{error.english && error.english}</span>
        </td>
        <td className="table__text">
            <input type="text" name={'transcription'} value={value.transcription}
                onChange={handleChange} onBlur={validateFunc}
                className={error.transcription ? 'errorinput' : " "}
            /><span><br />{error.transcription && error.transcription}</span>
        </td>
        <td className="table__text">
            <input type="text" name={'russian'} value={value.russian}
                onChange={handleChange} onBlur={validateFunc}
                className={error.russian ? 'errorinput' : " "}
            /> <span><br />{error.russian && error.russian}</span>
        </td>
        <td className="table__text">
            <input type="text" name={'tags'} value={value.tags}
                onChange={handleChange}
                className={error.tags ? 'errorinput' : " "}
            />
        </td>
        <td className="table__button">
            <button className="table__button-btn" onClick={funcCancel}>Cancel</button>
            <button className="table__button-btn" disabled={btnDisabled} onClick={funcSave}>Save</button></td>
    </tr>
    )
}