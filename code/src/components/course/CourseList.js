import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses}) => {
    return (
        <div className="table-responsive">
        <table className="table table-striped jambo_table bulk_action">
            <thead>
            <tr className="headings">
                <th className="column-title">&nbsp;</th>
                <th className="column-title">Title</th>
                <th className="column-title">Author</th>
                <th className="column-title">Category</th>
                <th className="column-title">Length</th>
            </tr>
            </thead>
            <tbody>
                {courses.map(course =>
                    <CourseListRow key={course.id} course={course} />
                )}
            </tbody>
        </table>
         <button type="button" class="btn btn-default">Right</button>
        </div>
    );
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
};

export default CourseList;