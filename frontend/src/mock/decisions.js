import _ from 'lodash';
import faker from 'faker';
import uuid from 'uuid/v1';

const getVersion = month => {
  switch (month.toLowerCase().substr(0, 3)) {
    case 'jan':
    case 'feb':
    case 'mar':
    case 'apr':
      return '2.1';
    case 'may':
    case 'jun':
    case 'jul':
        return '2.1.1';
    case 'aug':
    case 'sep':
    case 'oct':
    case 'nov':
    case 'dec':
        return '2.2';
    default:

  }
}

export default _.times(150).map(() => {
  const month = faker.date.month();
  const date = `${month} ${Math.random() * 28 | 1}, 2020`;
  return {
    key: `${faker.name.firstName()} ${faker.name.lastName()}`,
    info: {
      date,
      inputHash: uuid(),
      decision: Math.random() > 0.5 ? 'Approved' : 'Declined',
      parameterHash: uuid(),
      aiVersion: getVersion(month)
    }
  };
});
