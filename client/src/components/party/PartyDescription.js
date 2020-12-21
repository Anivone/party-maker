import React from "react";

const PartyDescription = ({
                              price,
                              dancing,
                              alcohol,
                              hookah,
                              ottoman
                          }) => {

    return (
        <div className='d-flex flex-row'>
            <span>Price: {price} UAH</span>
            {dancing ? <span className='ml-3'>Dancing</span> : null}
            {alcohol ? <span className='ml-3'>Alcohol</span> : null}
            {hookah ? <span className='ml-3'>Hookah</span> : null}
            {ottoman ? <span className='ml-3'>Ottoman</span> : null}
        </div>
    );

}

export default PartyDescription;