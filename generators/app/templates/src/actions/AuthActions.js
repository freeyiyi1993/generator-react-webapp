import {flux} from '../shared';


class AuthActions {
  authorize() {
    this.dispatch();
  }
}

export default flux.createActions(AuthActions);
