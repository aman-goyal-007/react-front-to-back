import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import TechSelectOptions from '../../component/tech/TechSelectOptions';
import { addLog } from '../../actions/logActions';

const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({
        html: 'Please Enter a message and tech'
      });
    } else {
      console.log(message, attention, tech);
      const newLog = {
        message,
        tech,
        attention,
        date: new Date()
      };
      addLog(newLog);
      M.toast({ html: `Log added by ${tech}` });
      // Clear Fields
      setMessage('');
      setAttention(false);
      setTech('');
    }
  };

  const modalStyle = {
    width: '75%',
    height: '75%'
  };
  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
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
              className='browser-default'
              onChange={e => setTech(e.target.value)}
            >
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
                  checked={attention}
                  value={attention}
                  className='filled-in'
                  onChange={e => setAttention(!attention)}
                />
                <span>Need Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          className='modal-close waves-effect waves-light btn blue'
          onClick={onSubmit}
        >
          Enter
        </a>
      </div>
    </div>
  );
};
AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired
};

export default connect(
  null,
  { addLog }
)(AddLogModal);
