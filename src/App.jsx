import React, { useState } from "react";
import Sidebar from "./components/Sidebar"; // استيراد مكون Sidebar
import Contain from "./components/Contain"; // استيراد مكون Contain
import Header from "./components/Header";



const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectSelect = (project) => {
    setSelectedProject(project); // يتم إرسال الكائن بالكامل
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar onProjectSelect={handleProjectSelect} className="h-screen"/>
        <Contain selectedProject={selectedProject} />
      </div>
    </div>
  );
};


export default App;

