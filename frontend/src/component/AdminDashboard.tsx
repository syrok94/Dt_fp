import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface Task {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

const AdminDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Task 1', status: 'To Do' },
    { id: '2', title: 'Task 2', status: 'In Progress' },
    { id: '3', title: 'Task 3', status: 'Done' },
  ]);

  const handleTaskDrag = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);
    setTasks(reorderedTasks);
  };

  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Task Board</h2>
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

export default AdminDashboard;
