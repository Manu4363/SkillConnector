import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addProject } from "../../actions/profile";

const AddProject = ({ addProject, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    kind: "",
    image: "",
    from: "",
    to: ""
  });

  const [toDateDisabled] = useState(false);

  const { title, description, kind, image, from, to } = formData;

  const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });

  }
 
  const onSubmit = e => {
    e.preventDefault();
   
    addProject(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Project</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap" /> Add any professional project
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="* Project Description"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <select name="kind" value={kind} onChange={e => onChange(e)}>
            <option value="0">* Select Category Project</option>
            <option value="Professional">Professional</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProject }
)(withRouter(AddProject));
