import {flux} from '../shared';


class <%= store %> {
  constructor() {
    // this.bindActions(SomeActions);
  }
}


export default flux.createStore(<%= store %>, '<%= store %>');
