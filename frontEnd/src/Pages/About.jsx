import React from "react";
import logo from "../assets/newlogo.png";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="About">
      <img src={logo} alt="Logo" />
      <h3>App Description :</h3>
      <p>
        Welcome to Workout Generator, your personalized fitness companion! This
        tool empowers you to craft customized workout routines tailored to your
        fitness goals. Simply select your target muscle group, and our
        capability to produce two exercises tailored to each proficiency level
        upon your selection of a specific muscle group. Get ready to transform
        your fitness journey with Workout Generator.
      </p>
      <h3>About me :</h3>
      <p>
        I'm Siva Swathi Vasagar, this project has been a labor of love, born out
        of my journey as a passionate learner at Per Scholas. My goal is to
        combine my evolving skills in both the design industry and software
        engineering to deliver an exceptional fitness experience as a front-end
        web engineer.
      </p>

      <p>
        I've honed my skills in HTML, CSS, JavaScript, and React to craft a
        seamless and user-friendly application. My commitment to problem-solving
        and creativity has driven me to create Workout Generator, a tool that I
        believe will empower individuals to take control of their fitness
        destinies.
      </p>

      <p>
        When I'm not coding or designing, you can find me exploring new
        technologies, seeking design inspiration, and working on exciting side
        projects. I'm always up for a challenge and eager to collaborate on
        innovative solutions.
      </p>
      <h3>Where to reach me:</h3>
      <p>Feel free to connect with me through the following channels:</p>
      <ul>
        <li>Email : sivaswathi.vasagar@gmail.com</li>
        <li>
          Linkedin :
          <a
            href="https://www.linkedin.com/in/siva-swathi-v-468429196/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Linkedin URL
          </a>
        </li>
        <li>
          GitHub :
          <a
            href="https://github.com/SivaSwathiVasagar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Github URL
          </a>
        </li>
        <li>
          Behance :
          <a
            href="https://www.behance.net/sivaswathi2007"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Behance URL
          </a>
        </li>
      </ul>
      <p>
        I'm open to discussions, feedback, and collaboration opportunities.
        Let's connect and explore the exciting possibilities that lie ahead in
        the world of fitness and technology.
      </p>
      <Footer />
    </div>
  );
}
