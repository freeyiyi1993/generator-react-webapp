import {flux} from '../shared';
import AuthActions from './actions';


class User {
  constructor() {
    this.bindActions(AuthActions);
  }

  onAuthorize() {
    console.log('User.onAuthorize...');
  }
}


export default flux.createStore(User, 'User');
