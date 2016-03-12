import {
  GET_COMMITTEES_SUCCESS,
} from '../actions/committees';

export default function committees(state = [], action) {
  switch (action.type) {
  case GET_COMMITTEES_SUCCESS:
    return action.committees;
  default:
    return state;
  }
}
