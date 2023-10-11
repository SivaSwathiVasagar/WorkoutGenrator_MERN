import React, { useState } from "react";

const WorkoutLog = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [workoutData, setWorkoutData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    primary_muscles: "",
    sets: 0,
    reps: 0,
    experienceType: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedMuscleGroup !== "") {
      // Make a fetch request to your MongoDB server based on the selected muscle group
      fetch(`http://localhost:4000/${selectedMuscleGroup}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setWorkoutData(data))
        .catch((error) => console.error(error));
    }
  };

  const handleMuscleGroupChange = (event) => {
    setSelectedMuscleGroup(event.target.value);
  };

  const handleEditWorkoutClick = (workout) => {
    setIsEditing(true);
    setSelectedWorkout(workout);
    setFormData({
      name: workout.name,
      primary_muscles: workout.primary_muscles,
      sets: workout.sets,
      reps: workout.reps,
      experienceType: workout.experienceType,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedWorkout(null);
    setFormData({
      name: "",
      primary_muscles: "",
      sets: 0,
      reps: 0,
      experienceType: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /// Creating a new workout
  // const handleCreateWorkout = () => {
  //   setIsCreating(true);
  //   setSelectedWorkout(null); // Clear any selected workout data
  //   setFormData({
  //     name: "",
  //     primary_muscles: "",
  //     sets: 0,
  //     reps: 0,
  //     experienceType: "",
  //   });
  // };

  const handleCreateWorkout = () => {
    setIsCreating(true);
    setSelectedWorkout(null); // Clear any selected workout data
    setFormData({
      name: "",
      primary_muscles: selectedMuscleGroup,
      sets: 0,
      reps: 0,
      experienceType: "",
    });
  };

  ////  CANCEL the changes
  const handleCancelCreate = () => {
    setIsCreating(false);
    setFormData({
      name: "",
      primary_muscles: "",
      sets: 0,
      reps: 0,
      experienceType: "",
    });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    // Check if selectedWorkout is not null
    if (selectedWorkout) {
      const updatedWorkoutData = {
        name: formData.name,
        primary_muscles: formData.primary_muscles,
        sets: formData.sets,
        reps: formData.reps,
        experienceType: formData.experienceType,
      };

      fetch(
        `http://localhost:4000/${selectedMuscleGroup}/${selectedWorkout._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedWorkoutData),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((editedWorkout) => {
          const updatedWorkouts = workoutData.map((workout) =>
            workout._id === editedWorkout._id ? editedWorkout : workout
          );
          setWorkoutData(updatedWorkouts);
          setIsEditing(false);
          setSelectedWorkout(null);
          setFormData({
            name: "",
            primary_muscles: "",
            sets: 0,
            reps: 0,
            experienceType: "",
          });
        })
        .catch((error) => console.error(error));
    } else {
      // Handle the case where selectedWorkout is null
      console.error("selectedWorkout is null");
    }
  };

  const handleDeleteWorkout = (workoutId) => {
    fetch(`http://localhost:4000/${selectedMuscleGroup}/${workoutId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        const updatedWorkouts = workoutData.filter(
          (workout) => workout._id !== workoutId
        );
        setWorkoutData(updatedWorkouts);
      })
      .catch((error) => console.error(error));
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    setIsCreating(false);
    const newWorkoutData = {
      name: formData.name,
      primary_muscles: formData.primary_muscles,
      sets: formData.sets,
      reps: formData.reps,
      experienceType: formData.experienceType,
    };
    fetch(`http://localhost:4000/${selectedMuscleGroup}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkoutData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((createdWorkout) => {
        // Update the UI with the newly created workout
        setWorkoutData([...workoutData, createdWorkout]);

        // Clear form data and exit creating mode
        setIsCreating(false);
        setFormData({
          name: "",
          primary_muscles: "",
          sets: 0,
          reps: 0,
          experienceType: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="WorkoutLog">
      <h2>Workouts log page</h2>
      <form className="APIForm" onSubmit={handleSubmit}>
        <label>
          Select a Muscle Group:
          <select
            value={selectedMuscleGroup}
            onChange={handleMuscleGroupChange}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="abs">Abs</option>
            <option value="chest">Chest</option>
            <option value="biceps">Biceps</option>
            <option value="triceps">Triceps</option>
            <option value="shoulder">Shoulder</option>
            <option value="lats">Lats</option>
          </select>
        </label>
        <button type="submit">Fetch Workouts</button>
      </form>

      {isEditing && selectedWorkout && (
        <div>
          <h3>Edit Workout</h3>
          <form onSubmit={isCreating ? handleCreateSubmit : handleEditSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Primary Muscles:
              <input
                type="text"
                name="primary_muscles"
                value={formData.primary_muscles}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Sets:
              <input
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Reps:
              <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Experience:
              <input
                type="text"
                name="experienceType"
                value={formData.experienceType}
                onChange={handleInputChange}
              />
            </label>
            <button className="CrudButtons" type="submit">
              {isCreating ? "Create" : "Save"}
            </button>
            {isCreating && <button onClick={handleCancelCreate}>Cancel</button>}
            <button className="CrudButtons" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      )}
      {isCreating && (
        <div>
          <h3>Create New Workout</h3>
          <form onSubmit={handleCreateSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Primary Muscles:
              <select
                value={selectedMuscleGroup}
                onChange={handleMuscleGroupChange}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="abs">Abs</option>
                <option value="chest">Chest</option>
                <option value="biceps">Biceps</option>
                <option value="triceps">Triceps</option>
                <option value="shoulder">Shoulder</option>
                <option value="lats">Lats</option>
              </select>
            </label>
            <label>
              Sets:
              <input
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Reps:
              <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Experience:
              <input
                type="text"
                name="experienceType"
                value={formData.experienceType}
                onChange={handleInputChange}
              />
            </label>
            <button className="CrudButtons" type="submit">
              Create
            </button>
            <button className="CrudButtons" onClick={handleCancelCreate}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <button
        className="Create"
        onClick={handleCreateWorkout}
        disabled={isCreating} // Disable the button when isCreating is true
      >
        Create New Workout
      </button>

      <div className="MapWorkouts">
        {workoutData.map((workout) => (
          <div className="SavedWorkouts" key={workout._id}>
            <h4>Name : {workout.name}</h4>
            <p>Primary Muscles : {workout.primary_muscles}</p>
            <p>Sets : {workout.sets}</p>
            <p>Reps : {workout.reps}</p>
            <p>Experience : {workout.experienceType} </p>
            <button
              className="CrudButtons"
              onClick={() => handleEditWorkoutClick(workout)}
            >
              Edit
            </button>
            <button
              className="CrudButtons"
              onClick={() => handleDeleteWorkout(workout._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutLog;
