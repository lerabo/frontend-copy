import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import './localization/i18n';
import { PersistGate } from 'redux-persist/integration/react';

const root = document.getElementById('root');
render(
	<Provider store={store}>
		<PersistGate loading={<div>loading...</div>} persistor={persistor}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	root,
);
