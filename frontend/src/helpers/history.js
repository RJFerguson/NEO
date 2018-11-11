import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export function changePage(route_) {
   // history.push(route_);
   history.push({pathname: route_})
}
