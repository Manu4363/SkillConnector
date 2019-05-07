import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteProject } from '../../actions/profile';

const Project = ({ project, deleteProject }) => {
  const projects = project.map(pro => (
    <tr key={pro._id}>
      <td>{pro.title}</td>
      <td className="hide-sm">{pro.description}</td>
      <td className="hide-sm">{pro.kind}</td>
      <td>
        <Moment format="YYYY/MM/DD">{pro.from}</Moment> -{' '}
        {pro.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{pro.to}</Moment>
        )}
      </td>
      <td>
          <button onClick={() => deleteProject(pro._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Project credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th className="hide-sm">Description</th>
            <th className="hide-sm">Category</th>
            <th className="hide-sm">Period</th>
            <th className="hide-sm">Actions</th>
          </tr>
        </thead>
        <tbody>{projects}</tbody>
      </table>
    </Fragment>
  );
};

Project.propTypes = {
    project: PropTypes.array.isRequired,
    deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(Project);
