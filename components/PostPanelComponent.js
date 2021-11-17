import React from "react";
import {Card, Text} from 'react-native-elements';

export function PostPanel(props){
    return(
        <Card>
            <Card.Title>
                <Text>
                {props.title}
                </Text>
            </Card.Title>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                    {props.body}
                </Text>

        </Card>
    )
}