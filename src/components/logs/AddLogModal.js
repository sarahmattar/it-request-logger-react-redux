import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

import TechSelectOptions from '../techs/TechSelectOptions';

import { connect } from 'react-redux';
import { addNewLog } from '../../actions/logActions';

const AddLogModal = ({ addNewLog }) => {
	//this component-level state can stay. It does not need app-level scope.
	const [message, setMessage] = useState('');
	const [attention, setAttention] = useState(false);
	const [tech, setTech] = useState('');

	//form validation
	const onSubmit = () => {
		if (message === '' || tech === '') {
			M.toast({ html: 'Please enter a message and select a technician' });
		} else {
			//capture form data in an object
			const formData = {
				message,
				tech,
				attention,
				date: new Date(),
			};

			//pass form data into function
			addNewLog(formData);

			//set an alert telling user that form is submitted successfully
			M.toast({ html: `Log added by ${tech}.` });

			// clear fields after submission
			setMessage('');
			setTech('');
			setAttention(false);
		}
	};

	return (
		<div id='add-log-modal' className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h4>New Request Log</h4>
				<div className='row'>
					<div className='input-field'>
						<input
							type='text'
							name='message'
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
						<label htmlFor='message' className='active'>
							Log Message
						</label>
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

AddLogModal.propTypes = {
	addNewLog: PropTypes.func.isRequired,
};

const modalStyle = {
	width: '75%',
	heigh: '75%',
};

export default connect(null, { addNewLog })(AddLogModal);
