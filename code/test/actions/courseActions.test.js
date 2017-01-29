import expect from 'expect';
import * as courseActions from '../../src/actions/CourseActions';
import * as types from '../../src/actions/actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Course Actions', () => {
    describe('createCourseSuccess', () => {
        it('should create a CREATE_COURSE_SUCCESS action', () => {
            // ARRANGE
            const course = { id: 'clean-code', title: 'Clean Code' };
            const expectedAction = {
                type: types.CREATE_COURSE_SUCCESS,
                course: course
            };

            // ACT
            const action = courseActions.createCourseSuccess(course);

            // ASSERT
            expect(action).toEqual(expectedAction);
        });
    });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });
    it('should create a BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
        // Here's an example to call nock, when using a real api
        // nock('http://example.com/')
        //  .get('/courses')
        //  .reply(200, { body: { course: [{ id: '1', firstName" 'Cory', lastName: 'House'}] }});
        // Nock will return this fake response instead

        // ARRANGE
        const expectedActions = [
            { type: types.BEGIN_AJAX_CALL },
            { type: types.LOAD_COURSES_SUCCESS, body: { courses: [{id: 'clean-code', title: 'Clean Code' }]}}
        ];

        // ACT
        const store = mockStore({courses: []}, expectedActions);

        // ASSERT
        store.dispatch(courseActions.loadCourses()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
            done();
        });
    });

    // it('should create a BEGIN_AJAX_CALL and CREATE_COURSE_SUCCESS when saving a new course', (done) => {
    //     // ARRANGE
    //     const expectedActions = [
    //         { type: types.BEGIN_AJAX_CALL },
    //         { type: types.CREATE_COURSE_SUCCESS, body: {id: 'new-course', title:'New Course', authorId:'John Doe'}}
    //     ];

    //     // ACT
    //     const newCourse = {id: 'new-course', title:'New Course', authorId:'John Doe'};
    //     const store = mockStore({course: newCourse}, expectedActions);

    //     // ASSERT
    //     store.dispatch(courseActions.saveCourse(newCourse)).then(() => {
    //         const actions = store.getActions();
    //         //expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
    //         //expect(actions[1].type).toEqual(types.CREATE_COURSE_SUCCESS);
    //         done();
    //     });
    // });
});