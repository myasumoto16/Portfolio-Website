import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Music from './components/Music';
import Contact from './components/Contact';
import Craft from './components/Craft';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import aws_diagram from "./assets/projects/AWS_Diagram.jpeg";
import intial_circuit from "./assets/projects/Schematic_Smart-Medication-Bottle_2025-04-03.png";
import first_pro from "./assets/projects/first-proto.jpeg";
import second_pro from "./assets/projects/second-proto.jpeg";
import third_pro1 from "./assets/projects/third-proto-1.jpg";
import third_pro2 from "./assets/projects/third-proto-2.jpeg";
import alexademo1 from "./assets/projects/alexa1.PNG";
import emaildemo from "./assets/projects/email.PNG";
import recipes from "./data/recipes-data.json";

import './App.css';

export const projects = [
  {
    id: "smartmedicationbottle",
    title: "Smart Medication Bottle 💊",
    description: "Smart medication bottle with built-in sensors that detects when it’s opened and sends users text or email notifications. It is also connected with Alexa for voice-based queries.",
    technologies: ["ESP8266", "C++", "AWS Lambda", "DynamoDB", "Alexa Skills", "IoT"],
    repo: "https://github.com/myasumoto16/Smart-Medication-Bottle",
    demo: "",
    mainImage: "",
    fullDescription: "This project helps users maintain their medication schedule by detecting when the bottle is opened and sending alerts. It also integrates with Alexa to allow users to ask if they've taken their medication.",
    intro: [
      "Does anyone else struggle with remembering to take their pill every day? My biggest challenge isn’t just forgetting—it’s not knowing whether I’ve already taken it, which can lead to double dosing or missing a dose entirely. Not ideal!",
      "To solve this, I decided to combine my software development skills with new hardware skills like soldering, circuit design, and IoT to build a smart notification system that ensures I never forget my medication. Since I also love using Alexa in my daily life, I saw this as a great opportunity to refresh my AWS skills as well!",
    ],
    techStack: [
      "C++",
      "ESP8266 NodeMCU board",
      "CR123A battery",
      "AWS: Lambda, API Gateway, DynamoDB",
      "Alexa Skills Development",
      "PlatformIO for VSCode",
      "Reed Switch",
      "10k Pull-up Resistor"
    ],
    sections: [
      {
        title: "Initial Design",
        bullets: [
        "I chose the ESP12F, specifically the NodeMCU D1 Mini, for several reasons. First, its compact size makes it ideal for attaching to a medication bottle. Second, it includes built-in Wi-Fi and Bluetooth capabilities, which are essential for sending notifications and integrating with AWS.",
        "The initial design prioritizes power efficiency by keeping the system in deep sleep mode when not in use. To enable automatic wake-up, the RST and GPIO16 (D0) pins are connected, allowing the board to reset. A normally open (N.O) reed switch acts as the trigger, initiating the reset sequence whenever it is disconnected.",
        "When the bottle is closed, the magnet is positioned near the reed switch. When the bottle is opened and the magnet moves away, the RST pin transitions from HIGH to LOW, triggering a reset operation",
        "Upon waking, the setup() function executes, either sending a notification or message to another ESP8266 before immediately returning to deep sleep. This ensures minimal power consumption, as the system only activates once or twice a day, striking a balance between functionality and battery life."
        ],
        images: [
          {url: intial_circuit, description: "Initial Circuit Design"},
        ],
      },
      {
        title: "First Prototype - One ESP8266",
        bullets: [
          "During the first breadboard prototyping, one ESP8266 was used to detect the reed switch state (connection/disconnection), connect to Wi-Fi, and send email or text notifications at once. Functionally, the system worked as intended, successfully detecting bottle openings and sending alerts.",
          "However, this approach proved impractical in real-world use. The entire process—from detection to notification—took 10–20 seconds, during which the user could have already taken the medication and put the cap back on, which would interrupt the operation. Additionally, the reliance on Wi-Fi connectivity and message transmission made the system power-hungry, which is a major drawback for battery-powered applications.",
        ],  
        images: [
          {url: first_pro, description: "First Prototype"},
          {url: emaildemo, description: "Email Notification"},
        ],    
      },
      {
        title: "Second Prototype - Two ESP8266s",
        bullets: [
        "A second breadboard prototype was developed using two ESP8266 modules. In this setup, one ESP8266 functions as a client attached to the medication bottle. Its sole responsibility is to detect the reed switch state and send a message to the server ESP8266 when the bottle is opened.",
        "The server ESP8266, powered via USB, handles the more power-intensive tasks—receiving the message from the client, connecting to Wi-Fi, and sending the notification. This separation of responsibilities significantly improves power efficiency, as the client module avoids the high energy consumption associated with Wi-Fi connectivity and notification handling.",
        "One small limitation of this setup is that both ESP-NOW and Wi-Fi operate on the same 2.4 GHz frequency and cannot run simultaneously. As a result, after receiving a message from the client, the server must temporarily disable ESP-NOW to connect to Wi-Fi and send the notification. While this works well for a single-client system, it could present challenges in a multi-client setup. If the server is connected to Wi-Fi and unable to receive ESP-NOW messages, communication from other clients may be missed.",
        ],
        images: [
          {url: second_pro, description: "Second Prototype with two ESP8266"},
        ],
      },
      {
        title: "Alexa Integration", 
        bullets: [
          "I love using Alexa in my everyday life. It makes getting information simple and convenient through voice commands, without the distractions of other apps on my phone. I don't want to accidentally get sucked into mindless scrolling while trying to rememeber if I took my medication!",
          "To enable this functionality, I created a DynamoDB table to store timestamps whenever the medication bottle is opened. When the server ESP8266 detects the event, it sends a REST API POST request to an AWS API Gateway endpoint. This triggers a Lambda function that records the timestamp in the DynamoDB table, ensuring the data is securely and accurately stored in real time.",
          "Building on this foundation, I developed a custom Alexa skill that allows users to ask, “Have I taken my medication today?” When prompted, Alexa queries the DynamoDB table through another Lambda function, checks for the last recorded activity, and checks if the date matches the current date. This is so much more practical and useful than email or text notifications for someone like me!",
        ],
        images: [
          {url: aws_diagram, description: "AWS Diagram"},
          {url: alexademo1, description: "Alexa Demo"},

        ],
      },
      {
        title: "Third Prototype - Perfboard with CR123A", 
        bullets: ["The third version of the project involved assembling all components onto a compact perfboard, powered by a CR123A battery. The most challenging part of the build was soldering, which took some practice to get used to.", 
          "The system functioned as expected, but the battery drained in under 24 hours, which was a major concern. Several possibilities could explain this rapid drain: the deep sleep function may not have executed correctly, the circuit design might be flawed and causing a constant draw, or deep sleep is working but still consuming more power than anticipated.",
          "Through further research, I discovered that the NodeMCU D1 Mini boards sometimes require two reset signals to fully reboot. I observed that when the magnet was removed from the reed switch, the board would reset inconsistently—sometimes it triggered a full reset, and other times it didn’t. It appears that the first reset may only wake the board without executing the setup() and loop() functions, while the second reset fully initializes the board. If only one reset is triggered, the board may stay awake without re-entering deep sleep, leading to significantly increased battery usage.",
        ],
        images: [
          {url: third_pro2, description: ""},
          {url: third_pro1, description: "Third Prototype on Perfboard"},
        ],
      },
      {
        title: "Next Step", 
        bullets: [
          "I plan to experiment with different circuit designs using a normally closed reed switch. In this setup, the reed switch will be placed between the battery and the 3.3V pin of the board. When the magnet is close, the reed switch remains open, completely cutting off power to the board. When the magnet moves away, the switch closes, allowing current to flow and turning the board on.",
          "This design could be more efficient than using deep sleep since, in theory, it should consume no power when the bottle is closed. By fully cutting off power instead of relying on deep sleep mode, battery life could be significantly extended, making the system more practical for long-term use."
        ]
        }
    ],
    videoDemo: "", 
    github: "", 
    detail: true,
  },
 {
    id: "bookrecommender",
    title: "Book Recommender with LLM 📚",
    description: "Book Recommendation systems utilizing OpenAI and HugginFace models, sentiment analysis, and vector search to categorize and suggest books, featuring an interactive Gradio UI for an enhanced user experience.",
    technologies: ["Python", "Gradio", "pandas", "OpenAI", "Hugging Face"],
    repo: "https://huggingface.co/spaces/peterhernandez24/Book-Recommender/tree/main",
    demo: "https://huggingface.co/spaces/peterhernandez24/Book-Recommender",
    detail: false,
  },
  {
    id: "moosa",
    title: "Moosa 🐾",
    description: "React Native video-sharing app for pet lovers, inspired by my cat Moose, allowing users to upload, like, and explore pet videos with secure authentication and cloud storage via Appwrite. 🐾📱",
    technologies: ["React Native", "JavaScript", "Expo", "Appwrite"],
    repo: "https://github.com/myasumoto16/Moosa",
    demo: "",
    detail: false,
  },
  {
    id: "mooseorlola",
    title: "Moose or Lola? 🐈",
    description: "Image classification system that determines if the given picture is our beloved ragdoll Moose or his identical-looking friend Lola!",
    technologies: ["Python", "fast.ai", "pandas", "Gradio"],
    repo: "https://huggingface.co/spaces/peterhernandez24/moose-or-lola/tree/main",
    demo: "https://huggingface.co/spaces/peterhernandez24/moose-or-lola",
    detail: false,
  },
  {
    id: "dast",
    title: "Open Source D.A.S.T 🔐",
    description: "Web App that automates web application security assessments, integrates open-source security tools, and manages user authentication and past assessment data via a REST API and MongoDB.",
    technologies: ["JavaScript", "NodeJS", "MongoDB", "Shell Script"],
    repo: "",
    demo: "https://youtu.be/JYaOncpckV8",
    detail: false,
  }, 
  {
    id: "mbtatransit",
    title: "MBTA Transit",
    description: "Android app that provides real-time updates on Massachusetts transit services by aggregating data from MBTA's REST APIs, enhancing accessibility and user experience through object-oriented programming.",
    technologies: ["Java", "Android SDK"],
    repo: "",
    demo: "",
    detail: false,
  }
];

const recipe_data = recipes;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail projects={projects} />} />
            <Route path="/music" element={<Music />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/other/craft" element={<Craft />} />
            <Route path="/other/recipes" element={<Recipes />} />
            <Route path="/other/recipes/:recipeId" element={<RecipeDetails recipes={recipe_data} />} />
            {/* 
            <Route path="/other/cooking" element={<Cooking />} />
            <Route path="/other/baking" element={<Baking />} /> 
            */}
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;