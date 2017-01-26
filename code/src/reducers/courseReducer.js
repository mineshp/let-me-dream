import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
    switch(action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;

            // ...state - es6 spread operator
            // spread the array, explode out as if i took all the values
            // and defined them below.
            // return [...state,
            //     Object.assign({}, action.course)
            // ];

        default:
            return state;
    }
}