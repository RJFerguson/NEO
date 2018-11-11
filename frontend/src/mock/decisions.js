import _ from 'lodash';

export default _.times(150).map(() => {
  return {
    key: 'Joe Smith',
    more_info: 30,
    timestamp: new Date()
  };
});