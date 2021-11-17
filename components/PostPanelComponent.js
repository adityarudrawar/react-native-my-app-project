import React from "react";
import {Card} from 'react-native-elements';

export function PostPanel(props){
    return(
        <Card>
            <Card.Title>HELLO WORLD</Card.Title>
            <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW NOW' />
        </Card>
    )
}