import React, { Component } from 'react';
import BirthWeek from './BirthWeek';
import BirthToday from './BirthToday';

class BirthDay extends Component {

    render() {

        return (

            <div>
                {/* <h2>Дни рождения</h2> */}

                <BirthToday />
                <BirthWeek />

            </div>

        );
    }
}

export default BirthDay;