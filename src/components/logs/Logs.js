import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

import { getLogs } from '../../actions/logActions';

//we are importing the entire log state and then destructuring 'logs' and 'loading' from it.

const Logs = ({ log: { logs, loading }, getLogs }) => {
	useEffect(() => {
		//when you bring in an Action it also becomes a prop, so destructure above.
		getLogs();
		//eslint-disable-next-line
	}, []);

	if (loading || logs === null) {
		return <Preloader />;
	}
	return (
		<ul className='collection with-header'>
			<li className='collection-header'>
				<h4 className='center'>IT Request Logs</h4>
			</li>
			{!loading && logs.length === 0 ? (
				<p className='center'>
					No requests to show. Click the + sign to add a new IT
					request.{' '}
				</p>
			) : (
				logs.map((log) => <LogItem log={log} key={log.id} />)
			)}
		</ul>
	);
};

Logs.propTypes = {
	log: PropTypes.object.isRequired,
	getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	//this is the name of the prop. It is identically named in our rootReducer.
	log: state.log,
});

//list the actions inside an object as a second parameter to the connect() function
export default connect(mapStateToProps, { getLogs })(Logs);
