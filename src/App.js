import logo from './logo.svg';
import './App.css';
import React, { lazy, Suspense, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Store } from 'store/mobx-store';

const Component = lazy(() => import('./Component.js'));

const store = Store.instance;
store.loadData();

const App = observer(props => {
    const click = () => store.increment();
    const loadData = () => store.loadData();
    const alterar = () => store.alterar();

    const loadLybrary = async () => {
        const lodash = await import('lodash');
        console.log(lodash);
    };

    useEffect(() => {
        loadLybrary();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                    {store.count}<br />
                    <button onClick={click}>Incrementar</button>
                    <button onClick={loadData}>Carregar</button>
                    <button onClick={alterar}>Alterar</button>
                    <Suspense fallback={"Loading..."}>
                        <Component />
                    </Suspense>
                </div>
            </header>
        </div>
    );
});

export default App;
