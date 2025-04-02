import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useState, useEffect } from 'react';
import SingleCharacterLayout from '../pages/singleCharacterLayout/SingleCharacterLayout';
import SingleComicLayout from '../pages/singleComicLayout/SingleComicLayout';
import SinglePage from "../pages/SinglePage";

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/SpinnerCircle';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Context />
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}

const Context = () => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    return (
        <div
            className={`${transitionStage}`}
            onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                    setTransistionStage("fadeIn");
                    setDisplayLocation(location);
                }
            }}
        >
            <Routes location={displayLocation}>
                <Route path="/" element={<MainPage />} />
                <Route path="/comics" element={<ComicsPage />} />
                <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic' />} />
                <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character' />} />
                {<Route path='*' element={<Page404 />} />}
            </Routes>
        </div>
    );
}

export default App;
