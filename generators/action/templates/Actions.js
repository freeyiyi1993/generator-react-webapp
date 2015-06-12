import {flux} from '../shared';


class <%= action %> {
  constructor() {
    this.generateActions([]);
  }
}


export default flux.createActions(<%= action %>);
