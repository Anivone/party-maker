import React from "react";

const PartyOption = ({
                         name,
                         description,
                         price,
                     }) => {

    return (
        <div className='d-flex flex-column'>
            <div>
                <span>{name}</span>
            </div>
            <div className='d-flex flex-row'>
                <div>
                    <span>{description}</span>
                </div>
                <div className='ml-3'>
                    <span>{price} UAH</span>
                </div>
            </div>
        </div>
    );

}

export default PartyOption;