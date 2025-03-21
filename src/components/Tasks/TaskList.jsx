import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
} from '../../redux/actions/taskActions';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, filter, priorityFilter } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    const fetchTasksData = async () => {
      dispatch(fetchTasksRequest());
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockTasks = [
          { id: 1, text: 'Task 1', completed: false, priority: 'High' },
          { id: 2, text: 'Task 2', completed: true, priority: 'Medium' },
          { id: 3, text: 'Task 3', completed: false, priority: 'Low' },
        ];
        dispatch(fetchTasksSuccess(mockTasks));
      }
      catch (err) {
        dispatch(fetchTasksFailure(err.message));
      }
    };
    fetchTasksData();
  }, [dispatch]);

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const statusMatch =
        filter === 'all' ||
        (filter === 'completed' && task.completed) ||
        (filter === 'active' && !task.completed);

      const priorityMatch =
        priorityFilter === 'all' || task.priority === priorityFilter;

      return statusMatch && priorityMatch;
    });
  };

  const filteredTasks = getFilteredTasks();

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="task-list-container">
      <h2>My Tasks</h2>

      <TaskFilters />

      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks match the current filters.</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;