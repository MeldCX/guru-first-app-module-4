import Agent from '@meldcx/agent';
const agent = new Agent();


import {
    OPTIONS_SET,
    OPTIONS_UPDATE,
    OPTIONS_REMOVE
} from './const';


export const optionsGet = () =>
    async dispatch => {
        await agent.onReadyAsync();
        const options = await agent.Device.getOptions();
        dispatch({type: OPTIONS_SET, options});
    };


export const optionsAdd = (option, value) =>
    async dispatch => {
        await agent.Device.addOption(option, value);
        dispatch({type: OPTIONS_UPDATE, option, value});
    };

export const optionsSet = (option, value) =>
    async dispatch => {
        await agent.Device.updateOption(option, value);
        dispatch({type: OPTIONS_UPDATE, option, name});
    };


export const optionsRemove = option =>
    async dispatch => {
        await agent.Device.deleteOption(option);
        dispatch({type: OPTIONS_REMOVE, option});
    };
