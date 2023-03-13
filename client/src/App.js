import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout';
import './index.css';

function App() {
    const cookies = new Cookies();
    const token = cookies.get('token');
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = DefaultLayout;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    route.isAuth && !!token ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
