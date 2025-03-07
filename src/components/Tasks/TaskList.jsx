import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/actions/taskActions';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error, filter, priorityFilter } = useSelector(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    // Filter tasks based on current filter settings
    const getFilteredTasks = () => {
        return tasks.filter(task => {
            // Status filter
            const statusMatch =
                filter === 'all' ||
                (filter === 'completed' && task.completed) ||
                (filter === 'active' && !task.completed);

            // Priority filter
            const priorityMatch =
                priorityFilter === 'all' ||
                task.priority === priorityFilter;

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
                    {filteredTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;