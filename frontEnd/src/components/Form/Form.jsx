import React from "react";
import { useState } from "react";

export default function Form(props) {
  const [formData, setFormData] = useState({
    muscleGroup: "",
  });
  const handleChange = (event) => {
    //use the event object to detect key and value to update
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    //prevent page from refreshing on form submission
    event.preventDefault();
    const selectedMuscleGroup = formData.muscleGroup;
    props.exerciseSearch(selectedMuscleGroup);
  };

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="choose"> Choose muscle group : </label>
        <select
          id="choose"
          name="muscleGroup"
          onChange={handleChange}
          value={formData.muscleGroup}
        >
          <option value="" disabled>
            Select muscle group
          </option>
          <option value="Shoulders">Shoulders</option>
          <option value="Lats">Lats</option>
          <option value="Chest">Chest</option>
          <option value="Triceps">Triceps</option>
          <option value="Biceps">Biceps</option>
          <option value="Abs">Abs</option>
        </select>
        {/* <input type="submit" value="submit"  /> */}
        <input type="submit" value="Submit" className="SubmitButton"></input>
      </form>
    </div>
  );
}
