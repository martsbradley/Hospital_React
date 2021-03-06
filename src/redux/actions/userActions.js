import * as Actions from './actionTypes';
import {login, logout} from '../../api/UserAPI';
import * as ErrorActions from './errorActions';

const loginSuccessHandler = (dispatch) => {
    return function(loginDetail) {
        dispatch({ type: Actions.LOGIN_SUCCESS,
                   payload: loginDetail
        });
    }
}
const logoutSuccessHandler = (dispatch) => {
    return function(logoutDetail) {
        dispatch({ type: Actions.LOGOUT_SUCCESS,
                   payload: logoutDetail
        });
    }
}

const errorHandler = (dispatch) => {
   return () => {
        dispatch(ErrorActions.errorSet("/error"));
    }
};

export function userLoginAction(username, password) {
    const promise = login(username, password);

    return dispatch => {
        dispatch({type:Actions.BEGIN_API_CALL});

        promise.then(loginSuccessHandler(dispatch))
               .catch(errorHandler(dispatch))
     };
}

export function userLogoutAction() {
    const promise = logout();

    return dispatch => {
        dispatch({type:Actions.BEGIN_API_CALL});

        promise.then(logoutSuccessHandler(dispatch))
               .catch(errorHandler(dispatch))
     };
}
