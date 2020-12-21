import React from "react";
import PartyDescription from "./PartyDescription";
import PartyOption from "./PartyOption";
import PartyRecommendations from "./PartyRecommendations";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";

const Party = ({
                   title,
                   description,
                   address,
                   date,
                   age,
                   requiredParticipants,
                   maximumParticipants,
                   participants,
                   features,
                   options,
                   partyId
               }) => {

    const myDate = new Date(date);

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h5" component="h2">
                    {description}
                </Typography>
                <Typography color="textSecondary">
                    {address.city}, {address.street}, {address.building}
                </Typography>
                <Typography color="textSecondary">
                    <span>{myDate.getFullYear()}/{myDate.getMonth()}/{myDate.getDate()}</span>
                    <span className='ml-3'>Age: {age}</span>
                    <span className='ml-3'>Required participants: {requiredParticipants}</span>
                </Typography>
                <div>
                    <PartyDescription
                        price={features.price}
                        dancing={features.dancing}
                        alcohol={features.alcohol}
                        hookah={features.hookah}
                        ottoman={features.ottoman}
                    />
                </div>
                <div className='d-flex flex-column'>
                    {options.map(o => <PartyOption
                        name={o.name}
                        description={o.description}
                        price={o.price}
                    />)}
                </div>
                <PartyRecommendations
                    partyId={partyId}
                />
            </CardContent>
        </Card>
    );
}

export default Party;