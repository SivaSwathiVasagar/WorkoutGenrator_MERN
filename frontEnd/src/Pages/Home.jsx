import React from "react";
import Footer from "../components/Footer";
import Form from "../components/Form/Form";
import GetExercise from "../components/GetExercise";
import { useState } from "react";

export default function Home() {
  const [exercises, setExercise] = useState(null);
  const getExercise = async (selectedMuscleGroup) => {
    const url = `https://exerciseapi3.p.rapidapi.com/exercise/primary_muscle/${selectedMuscleGroup}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_SOME_KEY,
        "X-RapidAPI-Host": "exerciseapi3.p.rapidapi.com",
      },
    };

    if (selectedMuscleGroup !== "") {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setExercise(result);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="Home">
      <h2>“Take care of your body. It’s the only place you have to live.”</h2>
      <h3>Welcome to my Fitness Planner!</h3>
      <p>
        Please choose the muscle group that you are planning to workout today
        from below options
      </p>
      <Form exerciseSearch={getExercise} />
      <GetExercise exercises={exercises} />
      <Footer />
    </div>
  );
}
