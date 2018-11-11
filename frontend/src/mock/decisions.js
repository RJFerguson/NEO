import _ from 'lodash';

export default _.times(150).map(i => {
  return {
    name: 'Joe Smith',
    age: 30,
    index: i
  };
});