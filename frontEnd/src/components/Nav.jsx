import { NavLink } from "react-router-dom";
import React from "react";

export default function Nav() {
  return (
    <div className="Nav">
      <NavLink to="/workoutGenerator/">
        <div>Home</div>
      </NavLink>
      <NavLink to="/workoutGenerator/blog">
        <div>Blog</div>
      </NavLink>
      <NavLink to="/workoutGenerator/about">
        <div>About</div>
      </NavLink>
      <NavLink to="/workoutGenerator/bmi">
        <div>BMI</div>
      </NavLink>
      <NavLink to="/workoutGenerator/workout-log">
        <div>WorkoutLog</div>
      </NavLink>
    </div>
  );
}
