import React from 'react'

export class Logout extends React.Component {

    render () { 
        let result = 
                <div>
                    <h1>Successful Log Out</h1>
                    <hr/>
                    You have been logged out successfully.
                </div>;

        return result;
    }
}
