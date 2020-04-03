import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import TechSelectOptions from '../techs/TechSelectOptions';

import { updateLog } from '../../actions/logActions';

const EditLogModal = ({ current, updateLog }) => {
	// keep the component level state
	const [message, setMessage] = useState('');
	const [attention, setAttention] = useState(false);
	const [tech, setTech] = useState('');

	useEffect(() => {
		if (current) {
			setMessage(current.message);
			setAttention(current.attention);
			setTech(current.tech);
		}
	}, [current]);

	const onSubmit = () => {
		if (message === '' || tech === '') {
			M.toast({ html: 'Please enter a message and select a technician' });
		} else {
			const formData = {
				id: current.id,
				message,
				attention,
				tech,
				date: new Date(),
			};
			updateLog(formData);
			M.toast({ html: `Log updated by ${tech}` });
			// clear fields
			setMessage('');
			setTech('');
			setAttention(false);
		}
	};
	return (
		<div id='edit-log-modal' className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h4>Edit Request Log</h4>
				<div className='row'>
					<div className='input-field'>
						<input
							type='text'
							name='message'
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='input-field'>
						<select
							name='tech'
							value={tech}
							className='browser-default'
							onChange={(event) => setTech(event.target.value)}>
							<option value='' disabled>
								Select Technician
							</option>
							<TechSelectOptions />
						</select>
					</div>
				</div>
				<div className='row'>
					<div className='input-field'>
						<p>
							<label>
								<input
									type='checkbox'
									className='filled-in'
									checked={attention}
									value={attention}
									onChange={(event) =>
										setAttention(!attention)
									}
								/>
								<span>Needs Attention</span>
							</label>
						</p>
					</div>
				</div>
			</div>
			<div className='modal-footer'>
				<a
					href='#!'
					onClick={onSubmit}
					className='modal-close waves-effect blue btn'>
					Enter
				</a>
			</div>
		</div>
	);
};

const modalStyle = {
	width: '75%',
	heigh: '75%',
};

EditLogModal.propTypes = {
	updateLog: PropTypes.func.isRequired,
	current: PropTypes.object,
};

const mapStateToProps = (state) => ({
	current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
