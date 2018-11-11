import _ from 'lodash';
import faker from 'faker';
import uuid from 'uuid/v1';


export default _.times(150).map(() => {
  return {
    key: `${faker.name.firstName()} ${faker.name.lastName()}`,
    info: {
      date: `${faker.date.month()} ${Math.random() * 28 | 0}, 2020`,
      inputHash: uuid(),
      decision: Math.random() > 0.5 ? 'Approved' : 'Declined',
      parameterHash: uuid()
    }
  };
});