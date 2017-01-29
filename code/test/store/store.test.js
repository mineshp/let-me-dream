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

    it('should handle updating courses', () => {
        // ARRANGE
        const courses = [
            { id: 'first-course', title: 'First Course'},
            { id: 'second-course', title: 'Second Course'}

        ];
        initialState.courses = courses;
        const store = createStore(rootReducer, initialState);
        const updatingExistingCourse = {
            id: 'first-course', title: 'Last Course'
        };

        // ACT
        const action = courseActions.updateCourseSuccess(updatingExistingCourse);
        store.dispatch(action);

        // ASSERT
        const actual = store.getState().courses;
        const expected = [
            { id: 'second-course', title: 'Second Course'},
            { id: 'first-course', title: 'Last Course'}
        ];

        expect(actual).toEqual(expected);
    });

    it('should handle loading courses', () => {
        // ARRANGE
        const courses = [
            { id: 'first-course', title: 'First Course'},
            { id: 'second-course', title: 'Second Course'}
        ];
        initialState.courses = courses;
        const store = createStore(rootReducer, initialState);

        // ACT
        const action = courseActions.loadCoursesSuccess(courses);
        store.dispatch(action);

        // ASSERT
        const actual = store.getState().courses;
        const expected = [
            { id: 'first-course', title: 'First Course'},
            { id: 'second-course', title: 'Second Course'}
        ];

        expect(actual).toEqual(expected);
    });
});