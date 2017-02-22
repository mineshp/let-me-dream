import expect from 'expect';
import * as courseActions from '../../src/actions/courseActions';
import * as types from '../../src/actions/actionTypes';
import _ from 'underscore';

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
    it('should create a BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', () => {
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
        return store.dispatch(courseActions.loadCourses()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
            expect(actions[1].courses.length).toEqual(5);
        });
    });

    it('should create a BEGIN_AJAX_CALL and CREATE_COURSE_SUCCESS when saving a new course', () => {
        // ARRANGE
        const expectedActions = [
            { type: types.BEGIN_AJAX_CALL },
            { type: types.CREATE_COURSE_SUCCESS, body: {id: 'new-course', title:'New Course', authorId:'John Doe'}}
        ];

        // ACT
        const newCourse = {title:'New Course', authorId:'John Doe'};
        const store = mockStore({course: newCourse}, expectedActions);

        // ASSERT
        return store.dispatch(courseActions.saveCourse(newCourse)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.CREATE_COURSE_SUCCESS);
            expect(_.keys(actions[1].course)).toEqual(['title', 'authorId', 'id', 'watchHref' ]);
            expect(actions[1].course.id).toEqual('New-Course');
        });
    });

    it('should create a BEGIN_AJAX_CALL and UPDATE_COURSE_SUCCESS when updating an existing course', () => {
        // ARRANGE
        const expectedActions = [
            { type: types.BEGIN_AJAX_CALL },
            { type: types.UPDATE_COURSE_SUCCESS, body: {id: 'existing-course', title:'Existing Course', authorId:'John Doe'}}
        ];

        // ACT
        const existingCourse = {id: 'existing-course', title:'Existing Course', authorId:'John Doe'};
        const store = mockStore({course: existingCourse}, expectedActions);

        // ASSERT
        return store.dispatch(courseActions.saveCourse(existingCourse)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.UPDATE_COURSE_SUCCESS);
            expect(_.keys(actions[1].course)).toEqual(['id', 'title', 'authorId']);
            expect(actions[1].course.id).toEqual(existingCourse.id);
        });
    });

    it('should throw a validation error when trying to save a course with a title containing less than 1 character', () => {
        // ARRANGE
        const expectedActions = [
            { type: types.BEGIN_AJAX_CALL },
            { type: types.CREATE_COURSE_SUCCESS, body: {id: 'new-course', title:'', authorId:'John Doe'}}
        ];

        // ACT
        const newCourse = {title:'', authorId:'John Doe'};
        const store = mockStore({course: newCourse}, expectedActions);

        // ASSERT
        return store.dispatch(courseActions.saveCourse(newCourse)).catch((err) => {
            expect(err).toEqual('Title must be at least 1 characters.');
        });
    });
});