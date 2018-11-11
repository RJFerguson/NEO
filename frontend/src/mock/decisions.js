import _ from 'lodash';
import faker from 'faker';

export default _.times(150).map(() => {
  return {
    key: 'Joe Smith',
    more_info: 30,
    timestamp: new Date()
  };
});