import expect from 'expect';
import courseReducer from '../../src/reducers/courseReducer';
import * as actions from '../../src/actions/courseActions';

describe('Course Reducer', () => {
    it('should add course when passed CREATE_COURSE_SUCCESS', () => {
        // ARRANGE
        const initialState = [
            {title: 'A'},
            {title: 'B'}
        ];

        const newCourse = {title: 'C'};
        const action = actions.createCourseSuccess(newCourse);

        // ACT
        const newState = courseReducer(initialState, action);

        // ASSERT
        expect(newState.length).toEqual(3);
        expect(newState[0].title).toEqual('A');
        expect(newState[1].title).toEqual('B');
        expect(newState[2].title).toEqual('C');
    });

    it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
        // ARRANGE
        const initialState = [
            {id: 'A', title: 'A'},
            {id: 'B', title: 'B'},
            {id: 'C', title: 'C'}
        ];

        const course = {id: 'B', title: 'New Title'};
        const action = actions.updateCourseSuccess(course);

        // ACT
        const newState = courseReducer(initialState, action);
        const updatedCourse = newState.find(a => a.id == course.id);
        const untouchedCourse = newState.find(a => a.id == 'A');

        // ASSERT
        expect(updatedCourse.title).toEqual('New Title');
        expect(untouchedCourse.title).toEqual('A');
        expect(newState.length).toEqual(3);
    });

    it('should load courses when passed LOAD_COURSES_SUCCESS', () => {
        // ARRANGE
        const initialState = [];

        const courses = [
            {title: 'A'},{title: 'B'},{title: 'C'}
        ];

        const action = actions.loadCoursesSuccess(courses);

        // ACT
        const newState = courseReducer(initialState, action);

        // ASSERT
        expect(newState.length).toEqual(3);
        expect(newState[0].title).toEqual('A');
        expect(newState[1].title).toEqual('B');
        expect(newState[2].title).toEqual('C');
    });
});