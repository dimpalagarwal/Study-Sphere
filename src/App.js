// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import React from "react";
// import { Navbar } from './components/edu/navbar';
// import { Footer } from './components/edu/footer';
// import EducationApp from "./components/edu/education-app";


// function App() {
//   return (
//     <div>
//       <Navbar />
//       <EducationApp />
//       <Footer />
//     </div>
//   );
// }

// export default App;
import React from "react";
import { Navbar } from './components/edu/navbar';
import { Footer } from './components/edu/footer';
import EducationApp from "./components/edu/education-app";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow">
        <EducationApp />
      </main>

      <Footer />
    </div>
  );
}

export default App;


