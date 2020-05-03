import {checkResponse, pageURL} from './api-utils'
const urlPrefix = "/meds";

export async function loadMedicines(pageToShow, itemsOnPage ) {
    const medicinesURL = `${urlPrefix}${pageURL(pageToShow, itemsOnPage)}`;

    console.log("loadMedicines");

    const response = await fetch(medicinesURL);

    let isError = checkResponse(response, medicinesURL);

    let medicines, total, result;

    try {
        /* Network errors are handled by checkResponse
         * so get the json data */
        const json = await response.json();

        if (!isError) {
            medicines = json.medicines;
            total     = json.pageInfo._dataSize;
            result = {medicines, total};

            console.log(medicines);
        } else {
            console.log("Return the validation error");
            console.log(json);
            result = json;
        }
    } catch(e) {
        console.log(e.message);
        throw e;
    }

    return { isError,
             data: result}
}
