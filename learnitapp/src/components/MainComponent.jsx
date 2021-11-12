import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainPage from "./mainPage";
import CardSlider from './CardSlider';
import Footer from './Footer';
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from './ErrorComponent'
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

export default function MainComponent() {

    const [words, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    useEffect(() => {
       setIsLoading(true);
        loadWords()
    }, []);

   const loadWords = () => {
        fetch('/api/words/', {
            method: 'GET',
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
            .then((response) => {
                setData(response)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error)
                setIsLoading(false)
            });
    }
    const { id } = words

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <LoadingComponent isLoading={isLoading} error={error} words={words}>
                       <Switch>
                        <Route exact path="/game">
                            <CardSlider words={words} />
                        </Route>
                        <Route exact path="/">
                            <MainPage key={id} words={words} id={id}  setIsLoading={setIsLoading} loadWords={loadWords} />
                        </Route>
                        <Route path="/"><ErrorComponent /></Route> 
                        </Switch>
                    </LoadingComponent>
                <Footer />
            </div>
        </BrowserRouter>
    )
}
