import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Logitem from './LogItem';
import Preloader from '../layout/Preloder';
import { getLogs } from '../../actions/logActions';
import PropTypes from 'prop-types';

const Logs = props => {
  // const [logs, setLogs] = useState([]);
  // const [loading, setLoading] = useState(false);
  // console.log('props.log', props.log);
  const { getLogs } = props;
  const { logs, loading } = props.log;

  useEffect(() => {
    getLogs();

    //eslint-disable-next-line
  }, []);

  // const getLogs = async () => {
  //   setLoading(true);
  //   const res = await fetch('/logs');
  //   const data = await res.json();
  //   setLogs(data);
  //   setLoading(false);
  // };

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p>No logs to show..</p>
      ) : (
        logs.map(log => {
          return <Logitem log={log} key={log.id} />;
        })
      )}
    </ul>
  );
};
Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    log: state.log
  };
};
export default connect(
  mapStateToProps,
  { getLogs }
)(Logs);
