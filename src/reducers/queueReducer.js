import { TOGGLE } from './../actions/queueActions'

const defaultState = {
    isVisible: false,
};

export default function queue(state = defaultState, action) {
    switch(action.type) {
        case TOGGLE: return { ...state, isVisible: !state.isVisible };
        default: return state;
    }
};