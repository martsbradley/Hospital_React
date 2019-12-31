import * as Actions from './actionTypes';
import {loadPatients, loadPatient, savePatient} from '../../api/PatientAPI';
import {AuthenticationError} from '../../api/Errors';
import * as ErrorActions from './errorActions';
import {setValidationAction} from './validationActions';

export function changePageAction(pageNumber) {
    return { type: Actions.PATIENTS_CHANGE_PAGE,
             pageNumber};
}

const loadPatientsSuccessHandler = (dispatch) => {
    return function([patients, total]) {
        dispatch({ type: Actions.PATIENTS_LISTED_SUCCESS,
                 patients,
                 total
        });
    }
}

const loadPatientSuccessHandler = (dispatch) => {
    return function(payload) {
        dispatch({ type: Actions.PATIENT_CURRENT_LOADED_SUCCESS,
                   payload
        });
    }
}

function handleError(dispatch, e) {
    console.warn(e);
    if (e instanceof AuthenticationError) {
        console.log("Authentication Error");
        dispatch(ErrorActions.errorSet("/error/authentication"));
    }
    else {
        dispatch(ErrorActions.errorSet("/error"));
    }
}

/* This action immediately calls the async network calls.
 * When the response comes back the success/failure
 * handlers are called */
export function loadPatientsAction(startPage, itemsOnPage) {
    const promise = loadPatients(startPage, itemsOnPage);

    return dispatch => {
        promise.then(loadPatientsSuccessHandler(dispatch))
               .catch(e => { handleError(dispatch, e);
                });
     };
}

export function unLoadPatientAction() {
    return { type: Actions.UNLOAD_PATIENT };
}

export function loadPatientAction(patientId) {
    const promise = loadPatient(patientId);

    return dispatch => {
        promise.then(loadPatientSuccessHandler(dispatch))
               .catch(e => { handleError(dispatch, e);
                });
     };
}

export function savePatientAction(patient, history) {
    const promise = savePatient(patient);

    return dispatch => {
            promise.then(result => {
                if (result.isError) {
                    dispatch(setValidationAction(result.data));
                }
                else {
                    history.push("/patients/list");
                }
            })
           .catch(myError => {
               console.warn("Save error.");
               handleError(dispatch, myError);
           })
     };
}
