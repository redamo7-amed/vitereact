import { IoIosAddCircleOutline } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import { useState, useEffect } from "react";

const Sidebar = ({ onProjectSelect }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // قراءة المشاريع من localStorage عند تحميل الصفحة
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setProjectName("");
    setProjectDescription("");
  };

  const addProject = () => {
    if (projectName.trim()) {
      const newProject = { id: projects.length + 1, name: projectName, description: projectDescription };
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects)); // حفظ المشاريع في localStorage
      closePopup();
    } else {
      alert("يرجى إدخال اسم المشروع.");
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    onProjectSelect(project); // إرسال المشروع الكامل إلى الأب
  };

  return (
    <div className="w-72 bg-white p-4 flex flex-col border-r h-screen">
      <div>
        <h3 className="text-2xl font-bold mb-4">Projects</h3>
      </div>
      <div>
        <button
          onClick={openPopup}
          className="flex justify-center items-center h-10 px-4 py-2 gap-2 mb-4 bg-black rounded-md text-sm font-medium w-full text-white"
        >
          <IoIosAddCircleOutline className="text-xl" />
          Add Project
        </button>

        {isPopupOpen && (
          <>
            <div
              onClick={closePopup}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            ></div>
            <div className="fixed bg-white rounded-lg left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Add New Project</h3>
                <button onClick={closePopup}>
                  <RiCloseFill className="text-xl" />
                </button>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Project Name</h3>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full h-10 border rounded-md mb-4"
                />
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md px-3 py-2 border"
                ></textarea>
              </div>
              <div className="flex flex-col-reverse mt-4">
                <button
                  onClick={addProject}
                  className="h-10 px-4 py-2 flex items-center justify-center rounded-md text-sm font-medium bg-black text-white ml-auto w-28"
                >
                  Add Project
                </button>
              </div>
            </div>
          </>
        )}

        <div style={{ marginTop: "20px" }}>
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleSelectProject(project)}
              className={`w-full h-10 rounded-md px-4 py-2 text-sm font-medium flex justify-start mb-2 ${
                selectedProject?.id === project.id
                  ? "bg-gray-100 text-black"
                  : "hover:bg-slate-100"
              }`}
            >
              <h4>{project.name}</h4>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
