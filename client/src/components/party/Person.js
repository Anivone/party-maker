import React from "react";
import PersonRating from "./PersonRating";

const Person = ({
                    firstName,
                    lastName,
                    middleName,
                    birthDate,
                    city,
                    personId
                }) => {

    return (
        <div className='d-flex flex-column'>
            <div>
                <span><b>{lastName} {firstName} {middleName}</b></span>
            </div>
            <div className='d-flex flex-row'>
                <div>
                    <span><b>Birthdate:</b> {birthDate}</span>
                </div>
                <div className='ml-2'>
                    <span><b>City:</b> {city}</span>
                </div>
            </div>
            <PersonRating
                personId={personId}
            />
        </div>
    );

}

export default Person;