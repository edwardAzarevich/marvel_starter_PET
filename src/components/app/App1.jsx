import { useState, useEffect, lazy, Suspense } from "react";
import {
    BrowserRouter,
    Link,
    useLocation,
    Route,
    Routes
} from "react-router-dom";
import "./app.css";
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';


const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

export default function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <AppHeader />
                <Suspense fallback={<Spinner />}>
                    {/* <nav>
                    <Link to="/">Home</Link>
                    <Link to="/other">Other</Link>
                </nav> */}

                    <Content />
                </Suspense>
            </div>
        </BrowserRouter>
    );
}

function Content() {
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
                <Route path="/comics/:comicId" element={<SingleComicPage />} />
                {<Route path='*' element={<Page404 />} />}
            </Routes>
        </div>
    );
}
