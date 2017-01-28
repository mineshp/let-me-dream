import expect from 'expect';
import {authorsFormattedForDropdown} from '../../src/selectors/selectors';

describe('Author Selectors', () => {
    describe('authorsFormattedForDropdown', () => {
        it('should return author data formatted for dropdown', () => {
            const authors = [
                { 'id': 'cory-house', 'firstName': 'Cory', 'lastName': 'House' },
                { 'id': 'scott-allen', 'firstName': 'Scott', 'lastName': 'Allen' }
            ];

            const expectedAuthors = [
                { 'value': 'cory-house', 'text': 'Cory House' },
                { 'value': 'scott-allen', 'text': 'Scott Allen' },
            ];

            expect(authorsFormattedForDropdown(authors)).toEqual(expectedAuthors);
        });
    });
});