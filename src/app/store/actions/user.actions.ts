import {IUserState} from '../state/user.state';
import {ActionType} from './action.type';

type SetUserPayloadType = IUserState;
type SetUserActionType = ActionType<'user/set', SetUserPayloadType>;
type ClearUserPayloadType = undefined;
type ClearUserActionType = ActionType<'user/clear', ClearUserPayloadType>;

export type UserActionType = SetUserActionType | ClearUserActionType;

const userActions = {
  setUser: (payload: SetUserPayloadType): SetUserActionType => {
    return {
      type: 'user/set',
      payload,
    };
  },

  clearUser: (): ClearUserActionType => {
    return {
      type: 'user/clear',
      payload: undefined,
    };
  },
};

export default userActions;
