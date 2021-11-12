import React, {useState} from "react";

export default function AddNewWord({ loadWords }) {

    const [value, setValue] = useState({
        russian: '',
        english: '',
        transcription: '',
        tags: '',
    });

    const [error, setError] = useState({
        russian: false,
        english: false,
        transcription: false
    });

    const funcCancel = () => {
        setValue({
            russian: '',
            english: '',
            transcription: '',
            tags: '',
        });
        setError({
            russian: '',
            english: '',
            transcription: ''
        });
    };

    const funcSave = () => {
        fetch('/api/words/add', {
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
            .then (setValue({
            russian: '',
            english: '',
            transcription: '',
            tags: '',
        }))
    }

    const validateFunc = () => {
        if (value.english.match(/[А-Яа-яЁё]/gm)) {
            setError({ ...error, english: 'Только латинские буквы' })
        } else if (value.russian.match(/[A-Za-z]/gm)) {
            setError({ ...error, russian: 'Только русские буквы' })
        } else if (value.transcription.match(/[А-Яа-яЁё]/gm)) {
            setError({ ...error, transcription: 'Только латинские буквы' })
        } else {
            setError('')
        }
    }
    
    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: !e.target.value.trim() })
    };

    return (
    <div className="newword-form">
        <div className="newword-promo">Добавь своё слово:</div>
        <tr className="newword-table" >
            <td className="addtable__text">
                <input type="text" name={'english'} value={value.english}
                    onChange={handleChange} onBlur={validateFunc}
                    className={error.english ? 'errorinput' : " "} placeholder="Слово"
                /><span><br />{error.english && error.english}</span>
            </td>
            <td className="addtable__text">
                <input type="text" name={'transcription'} value={value.transcription} onBlur={validateFunc}
                    onChange={handleChange} className={error.transcription ? 'errorinput' : " "} placeholder="Транскрипция"
                /><span><br />{error.transcription && error.transcription}</span>
            </td>
            <td className="addtable__text">
                <input type="text" name={'russian'} value={value.russian}
                    onChange={handleChange} onBlur={validateFunc} placeholder="Перевод"
                    className={error.russian ? 'errorinput' : " "}
                /> <span><br />{error.russian && error.russian}</span>
            </td>
            <td className="addtable__text">
                <input type="text" name={'tags'} value={value.tags} placeholder="Теги"
                    onChange={handleChange} className={error.tags ? 'errorinput' : " "}

                />
            </td>
            <td className="addtable__button">
                <button className="addtable__button-btn" onClick={funcCancel}>Cancel</button>
                <button className="addtable__button-btn" onClick={funcSave}>Save</button></td>
        </tr>
    </div >
    )
}
