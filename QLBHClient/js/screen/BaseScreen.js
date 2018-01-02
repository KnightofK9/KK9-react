import React, {Component} from 'react';
import SessionManager from '../share/SessionManager'
export default class BaseScreen extends Component{
    constructor(props){
        super(props);
        //TODO Debug only
        SessionManager.loadDebugSessionIfNotExists();
    }
}