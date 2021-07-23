import React from 'react';
import {Form} from './Form';

const JoinGame = ({onSubmit, isGameIDvalid}) => (
    <div>
        <Form
          onSubmit = {onSubmit}
          isGameIDvalid = {isGameIDvalid}
        />
    </div>
)
export {JoinGame}
