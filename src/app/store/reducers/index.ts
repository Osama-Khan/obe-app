import {UserState} from '../state';
import {ActionType} from '../actions/action.type';
import UserReducer from './user.reducer';
import {UserActionType} from '../actions/user.actions';

const initialState = {
  user: new UserState(),
};
export default function Reducer(
  state = initialState,
  action: UserActionType | ActionType<'', undefined>,
) {
  return {
    user: UserReducer(state.user, action),
  };
}
