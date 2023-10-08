import React, { useState } from "react";

export default function BMI() {
  const [formData, setFormData] = useState({
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "meters",
    result: "",
  });
  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    calculateBMI();
  };
  function calculateBMI() {
    const weight = parseFloat(formData.weight);
    // const height = parseFloat(formData.height);

    // Convert weight to kg if it's in pounds
    // console.log(formData.weightUnit);
    // console.log(height);
    const weightInKg =
      formData.weightUnit === "pounds/lb" ? weight * 0.45359237 : weight;
    // Convert height to meters based on the selected unit
    // let heightInMeters = height;
    // if (formData.heightUnit === "cm") {
    //   heightInMeters = height / 100;
    // } else if (formData.heightUnit === "inches") {
    //   heightInMeters = height * 0.0254;
    // } else if (formData.heightUnit === "feet") {
    //   heightInMeters = height * 0.3048;
    // }
    // console.log("Weight in Kg:", weightInKg);
    // console.log("Height in Meters:", heightInMeters);
    let heightInMeters;
    if (formData.heightUnit === "cm") {
      heightInMeters = parseFloat(formData.height) / 100;
    } else if (formData.heightUnit === "inches") {
      // Parse the height value as a feet-inches combination (e.g., 5'8")
      const heightParts = formData.height.split("'");
      const feet = parseFloat(heightParts[0]);
      const inches = parseFloat(heightParts[1].replace('"', ""));
      // Convert feet and inches to meters
      heightInMeters = feet * 0.3048 + inches * 0.0254;
    } else if (formData.heightUnit === "feet") {
      // Parse the height value as feet
      heightInMeters = parseFloat(formData.height) * 0.3048;
    }
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setFormData({ ...formData, result: bmi.toFixed(1) });
  }

  return (
    <div className="BMI">
      <div className="BMIForm">
        <h3>BMI Guru: Your Personalized Health Tracker</h3>
        <div id="bmi-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="weight">Weight</label>
            <div className="input_field">
              <input
                type="number"
                id="weight"
                name="weight"
                onChange={handleChange}
                value={formData.weight}
                placeholder="Enter weight"
                required
              ></input>
              <select
                onChange={handleChange}
                id="weight-unit"
                name="weightUnit"
              >
                <option value="kg">Kg</option>
                <option name="pounds/lb" value="pounds/lb">
                  Pounds/Lb
                </option>
              </select>
            </div>
            <br />
            <label htmlFor="height">Height</label>
            <div className="input_field">
              <input
                type="number"
                id="height"
                name="height"
                onChange={handleChange}
                value={formData.height}
                placeholder="Enter height"
                required
              ></input>
              <select
                onChange={handleChange}
                id="height-unit"
                name="heightUnit"
              >
                <option name="meters" value="meters">
                  Meters
                </option>
                <option name="cm" value="cm">
                  Centimeters
                </option>
                <option value="inches">Inches</option>
                <option value="feet">Feet</option>
              </select>
            </div>
            <br />
            <button>Calculate BMI</button>
            <div id="result">
              {formData.result && (
                <p>
                  Your BMI is: {formData.result} kg/m<sup>2</sup>
                </p>
              )}
            </div>
          </form>
        </div>
        <div className="BMIRange">
          <h3> BMI Categories : </h3>
          <ul>
            <li>Underweight = less than 18.5</li>
            <li>Normal weight = 18.5–24.9</li>
            <li>Overweight = 25–29.9</li>
            <li>Obesity = BMI of 30 or greater</li>
          </ul>
        </div>
      </div>
      <div className="BMI_Info">
        <h3>
          Maintaining a healthy Body Mass Index (BMI) is crucial for promoting
          and sustaining a healthy lifestyle. Here are some reasons why it's
          important:
        </h3>
        <h4>Indicator of Healthy Weight: </h4>
        <p>
          BMI serves as a reliable indicator of whether your weight falls within
          a healthy range for your height. It helps you determine if you are
          underweight, normal weight, overweight, or obese.
        </p>
        <h4>Health Risk Assessment: </h4>
        <p>
          Maintaining a healthy BMI can help assess your risk of various health
          conditions such as heart disease, diabetes, hypertension, and certain
          types of cancer. Individuals with an elevated BMI are more susceptible
          to these conditions.
        </p>
        <h4>Improved Physical Health: </h4>
        <p>
          Achieving and maintaining a healthy BMI can lead to better physical
          health. It reduces the risk of obesity-related health problems,
          including joint pain, sleep apnea, and fatty liver disease.
        </p>
        <h4>Enhanced Mental Well-Being: </h4>
        <p>
          A healthy BMI contributes to improved mental well-being and
          self-esteem. It can boost your confidence and body image, reducing the
          risk of depression and anxiety related to body weight concerns.
        </p>
        <h4>Increased Longevity: </h4>
        <p>
          Studies have shown that maintaining a healthy weight through a
          balanced BMI can increase your life expectancy and overall quality of
          life.
        </p>
        <h4>Personalized Fitness Goals: </h4>
        <p>
          Knowing your BMI can help you set realistic fitness goals tailored to
          your individual health needs and body type.
        </p>
      </div>
    </div>
  );
}
