import React from 'react'
import ValidationMessage from '../../validationmessage.js'
import PropTypes from 'prop-types';

export default function StartDate({medicineName, startDate, endDate, handleFormChange, editEndDate}) {
    const isBlocking = false;

    let startDateElement;
    let endDateBlock = null;
    let heading = 'Start';

    const dateChanged = (event) => handleFormChange(event.target.value);

    if (editEndDate) {
        heading = 'End'
        startDateElement = <input type="date" className="form-control " name="startDate" 
                                  value={startDate} readOnly disabled
                                  onChange={handleFormChange}/>

        endDateBlock = <div className="form-group">
                           <label htmlFor="endDate">End Date</label>
                           <input type="date" 
                                  className="form-control " name="endDate" 
                                  value={endDate}
                                  onChange={dateChanged}/>
                       </div>
    }
    else {
        startDateElement = <input type="date" className="form-control " name="startDate" 
                                  value={startDate}  
                                  onChange={dateChanged}/>
    }

    return (<div>
            <h1>Prescription Select {heading} Date</h1>
            <div className="col-md-6 form-line">
               <div className="form-group">
                   <label htmlFor="medicine">Medicine</label>
                   <input type="input" className="form-control" name="medicine" 
                          readOnly disabled value={medicineName} />
               </div>
               
               <div className="form-group">
                   <label htmlFor="startDate" >Start Date</label>
                   {startDateElement}
               </div>

               {endDateBlock}
               
               <div className="col-md-6">
                     <ValidationMessage when={isBlocking} what="Date cannot be in the past"/>
               </div>
            </div>
        </div>);
}

StartDate.propTypes = {
    medicineName     : PropTypes.string,
    aDate            : PropTypes.string,
    handleFormChange : PropTypes.func,
    editEndDate      : PropTypes.bool,
    startDate        : PropTypes.string,
    endDate          : PropTypes.string,
}