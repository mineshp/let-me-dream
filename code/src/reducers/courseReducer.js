import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch(action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;

            // ...state - es6 spread operator
            // spread the array, explode out as if i took all the values
            // and defined them below.
            // return [...state,
            //     Object.assign({}, action.course)
            // ];

        case types.CREATE_COURSE_SUCCESS:
            return [
                // ...state creates a copy of the existing array of courses held in state
                // Then add the new course we just created to our new array.
                ...state,
                Object.assign({}, action.course)
            ];

        case types.UPDATE_COURSE_SUCCESS:
            // ...state.filter, get a list of all the courses except for the course that is being updated
            // ... we add the updated course to the new copy we created above.
            return [
                ...state.filter((course) => course.id !== action.course.id),
                Object.assign({}, action.course)
            ];

        default:
            return state;
    }
}