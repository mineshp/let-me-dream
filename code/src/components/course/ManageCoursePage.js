import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    // This method will ensure when the course page is refreshed, the
    // course props are not lost.
    // This functions runs anytime React thinks the props have changed.
    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) {
            // Neccessary to populate form when existing course is loaded directly.
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    // Allows textInput editing, keyboard events
    // This function allows editing for all fields in the form
    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirect())
            .catch((error) => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Course saved');
        this.context.router.push('/courses');
    }

    render() {
        return(
            <CourseForm
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter( course => course.id == id );
    if (course.length ) return course[0]; // Filter returns an array, grab the first one
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; // from the path `/course:id`

    let course = {id: '', watchHref:'', title:'', authorId:'', length:'', category:''};

    if (courseId && state.courses.length > 0) {
        course=getCourseById(state.courses, courseId);
    }

    // Transform state we get from our api to something our dropdown can understand
    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);