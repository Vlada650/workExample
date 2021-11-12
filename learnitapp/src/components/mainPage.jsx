import React from "react";
import WordsTable from './WordsTable'
import AddNewWord from "./AddNewWord";

const MainPage = ({ words, id, loadWords,  setIsLoading }) => {
    return (
        <>
            <AddNewWord loadWords={loadWords} />
            <table className="main">
                <thead>
                    <tr>
                        <th className="main__container">English</th>
                        <th className="main__container">Transcription</th>
                        <th className="main__container">Russian</th>
                        <th className="main__container">Unit</th>
                        <th className="main__container">Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((words) => {
                        return (
                            <WordsTable key={id} words={words} id={id}  setIsLoading={setIsLoading} loadWords={loadWords} />)
                    })}
                </tbody>
            </table>
        </>
    )
}
export default MainPage;