import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage, ComicsPage } from '../pages';
import AppHeader from "../appHeader/AppHeader";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch>
                        <Router>
                            <Route exact path="/">
                                <MainPage />
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage />
                            </Route>
                        </Router>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;