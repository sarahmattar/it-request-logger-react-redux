import React, { Fragment, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'; //brings in main CSS for Materialize
import M from 'materialize-css/dist/js/materialize.min.js'; //brings in JS for adding modals
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import AddButton from './components/layout/AddButton';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import AddTechModal from './components/techs/AddTechModal';
import TechListModal from './components/techs/TechListModal';

const App = () => {
	useEffect(() => {
		//Initialize Materialize's JS Library
		M.AutoInit();
	});

	return (
		<Provider store={store}>
			<Fragment>
				<SearchBar />
				<div className='container'>
					<AddButton />
					<AddLogModal />
					<EditLogModal />
					<AddTechModal />
					<TechListModal />
					<Logs />
				</div>
			</Fragment>
		</Provider>
	);
};

export default App;
