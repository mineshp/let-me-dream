import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../src/reducers';
import initialState from  '../../src/reducers/initialState';
import * as courseActions from '../../src/actions/CourseActions';

describe('Store', () => {
    it('should handle creating courses', () => {
        // ARRANGE
        const store = createStore(rootReducer, initialState);
        const course = {
            title: 'Clean Code'
        };

        // ACT
        const action = courseActions.createCourseSuccess(course);
        store.dispatch(action);

        // ASSERT
        const actual = store.getState().courses[0];
        const expected = {
            title: 'Clean Code'
        };

        expect(actual).toEqual(expected);
    });
});