import './App.css';
import { observer } from 'mobx-react-lite';
import { Store } from './store/mobx-store';
import { LoadingState, ErrorState, SuccessState } from './states/states';
import { lazy } from 'react';

const Graphics = lazy(() => import('./Graphics'));

const store = Store.instance;

const Component = observer(props => {
    var stateRendered = <div>Start</div>;
    if (store.state instanceof LoadingState) {
        stateRendered = <div>Loading...</div>
    } else if (store.state instanceof ErrorState) {
        stateRendered = <div>Error: {store.state.error}</div>
    } else if (store.state instanceof SuccessState) {
        stateRendered = <div>Success!
            <div>
                {store.state.list.map(item => <div key={item.id}>Id: {item.id} Name: {item.name}</div>)}
            </div>
        </div>;
    }

    return <div>
        <Graphics text="nelson" />{ stateRendered }
    </div>;
});

export default Component;
