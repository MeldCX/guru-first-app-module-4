import immutable from 'seamless-immutable';


import {
    OPTIONS_SET,
    OPTIONS_UPDATE,
    OPTIONS_REMOVE
} from 'actions/const';


const initialState = immutable({});


export default (state = initialState, action) => {
    switch (action.type) {
        case OPTIONS_SET:
            return immutable(action.options);

        case OPTIONS_UPDATE:
            return state.set(action.option, action.value);

        case OPTIONS_REMOVE:
            return state.without(action.option);
        default:
            return state;
    }
};
