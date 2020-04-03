import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux';
import {
	deleteLog,
	setCurrentLog,
	clearCurrentLog,
} from '../../actions/logActions';

const LogItem = ({ log, deleteLog, setCurrentLog, clearCurrentLog }) => {
	const onDelete = () => {
		deleteLog(log.id);
		M.toast({ html: 'Log Deleted' });
	};
	return (
		<li className='collection-item'>
			<div>
				<a
					href='#edit-log-modal'
					className={`modal-trigger ${
						log.attention ? 'red-text' : 'blue-text'
					}`}
					onClick={() => setCurrentLog(log)}>
					{log.message}
				</a>
				<br />
				<span className='grey-text'>
					<span className='black-text'>ID #{log.id}</span> Last
					updated by: <span className='black-text'>{log.tech}</span>{' '}
					on{' '}
					<span className='black-text'>
						<Moment format='MMMM Do YYYY, h:mm:ss a'>
							{log.date}
						</Moment>
					</span>
				</span>
				<a href='#!' onClick={onDelete} className='secondary-content'>
					<i className='material-icons grey-text'>delete</i>
				</a>
			</div>
		</li>
	);
};

LogItem.propTypes = {
	log: PropTypes.object.isRequired,
	deleteLog: PropTypes.func.isRequired,
	setCurrentLog: PropTypes.func.isRequired,
	clearCurrentLog: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog, setCurrentLog, clearCurrentLog })(
	LogItem
);
