import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const dataTask = [
  { id: 1, title: "TO DO" },
  { id: 2, title: "IN PROGRESS" },
  { id: 3, title: "DONE" },
];

const Contain = ({ selectedProject }) => {
  // حالة لتخزين النصوص المدخلة لكل قائمة
  const [taskInputs, setTaskInputs] = useState(
    dataTask.reduce((acc, task) => {
      acc[task.id] = ""; // قيمة مبدئية فارغة لكل input
      return acc;
    }, {})
  );

  // حالة لتخزين المهام في كل قسم
  const [tasks, setTasks] = useState({
    1: [], // TO DO
    2: [], // IN PROGRESS
    3: [], // DONE
  });

  // وظيفة للتعامل مع تغييرات الـ input
  const handleInputChange = (e, id) => {
    const { value } = e.target;
    setTaskInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // وظيفة لإضافة مهمة جديدة عند الضغط على الزر
  const handleAddTask = (id) => {
    const taskText = taskInputs[id].trim();
    if (taskText) {
      // إضافة المهمة في بداية القائمة بدلاً من نهايتها
      setTasks((prev) => ({
        ...prev,
        [id]: [taskText, ...prev[id]], // إضافة المهمة في بداية المصفوفة
      }));
      
      // مسح الـ input بعد إضافة المهمة
      setTaskInputs((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  if (!selectedProject) {
    return (
      <div className="text-center text-gray-500 flex justify-center items-center w-full ">
        <h3 className="text-xl">Select a project to view tasks</h3>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gray-100 p-6 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{selectedProject.name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dataTask.map((data) => (
          <div key={data.id} className="bg-gray-50 rounded-lg h-screen">
            <div className="p-4">
              <h2 className="text-sm font-medium text-gray-900">{data.title}</h2>
              <div className="space-y-3 min-h-[30px]"></div>
              
              {/* عرض المهام الحالية في هذا القسم أولاً */}
              <ul className="mt-4 " >
                {tasks[data.id].map((task, index) => (
                  <li key={index} className="text-sm text-gray-700 bg-gray-100 w-full my-4 h-24">{task}</li>
                ))}
              </ul>

              {/* عرض الـ input أسفل المهام */}
              <div className="flex gap-2 mt-4">
                <input
                  className="h-10 w-full rounded-md px-3 py-2 text-sm border"
                  placeholder="Add a new task"
                  type="text"
                  value={taskInputs[data.id]} // ربط النص المدخل مع الـ state الخاص بكل مهمة
                  onChange={(e) => handleInputChange(e, data.id)} // تحديث الـ state عند الكتابة
                />
                <button
                  className="flex items-center rounded-md h-10 w-10 text-xl font-medium justify-center bg-black text-white"
                  onClick={() => handleAddTask(data.id)} // استدعاء الوظيفة عند الضغط
                >
                  <IoIosAddCircleOutline />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contain;
