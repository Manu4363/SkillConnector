import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteProject } from '../../actions/profile';

const Project = ({ project, deleteProject }) => {
  const projects = project.map(pro => {
    const strImage = extractFilename(`${pro.image}`);
    return(
    <tr key={pro._id}>
      <td>{pro.title}</td>
      <td>
      {
        <td>{`${__dirname}/client/public/uploads/${strImage}`} </td>
      }
      </td>
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
          <button onClick={() => ""} className="btn btn-success">Edit</button>
          <button onClick={() => deleteProject(pro._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  )});
  return (
    <Fragment>
      <h2 className="my-2">Project credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>        
            <th className="hide-sm">Image</th>          
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

export function extractFilename(path) {
  if (path.substr(0, 12) === "C:\\fakepath\\")
    return path.substr(12); // modern browser
  var x;
  x = path.lastIndexOf('/');
  if (x >= 0) // Unix-based path
    return path.substr(x+1);
  x = path.lastIndexOf('\\');
  if (x >= 0) // Windows-based path
    return path.substr(x+1);
  return path; // just the filename
}

Project.propTypes = {
    project: PropTypes.array.isRequired,
    deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(Project);
