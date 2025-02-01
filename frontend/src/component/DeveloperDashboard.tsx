/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Define types for Task
interface Task {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

const DeveloperDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Fix Bug', status: 'To Do' },
    { id: '2', title: 'Code Feature X', status: 'In Progress' },
    { id: '3', title: 'Deploy Release', status: 'Done' },
  ]);
  const [hoursLogged, setHoursLogged] = useState<{ [key: string]: number }>({ '1': 0, '2': 0, '3': 0 });

  const handleTaskDrag = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);
    setTasks(reorderedTasks);
  };

  const handleTimeLog = (taskId: string, time: number) => {
    setHoursLogged((prev) => ({ ...prev, [taskId]: time }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Developer Dashboard</h1>

      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Task List</h2>
        <DragDropContext onDragEnd={handleTaskDrag}>
          <div className="flex space-x-4">
            {['To Do', 'In Progress', 'Done'].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-1/3 p-2 bg-gray-50 rounded-lg shadow-md"
                  >
                    <h3 className="font-semibold text-lg text-gray-700 mb-2">{status}</h3>
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable draggableId={task.id} index={index} key={task.id}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-blue-100 mb-3 rounded-md shadow-sm"
                            >
                              {task.title}
                              <div className="mt-2">
                                <input
                                  type="number"
                                  placeholder="Log hours"
                                  className="p-2 border rounded-md w-full"
                                  onChange={(e) => handleTimeLog(task.id, parseInt(e.target.value))}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
