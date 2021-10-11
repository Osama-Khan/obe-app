import {UserState} from '../state';
import {ActionType} from '../actions/action.type';
import {UserActionType} from '../actions/user.actions';

const initialState = new UserState();

export default function UserReducer(
  state = initialState,
  action: UserActionType | ActionType<'', undefined>,
) {
  switch (action.type) {
    case 'user/set':
      return new UserState(action.payload);
    case 'user/clear':
      return new UserState();
  }
  return state;
}
