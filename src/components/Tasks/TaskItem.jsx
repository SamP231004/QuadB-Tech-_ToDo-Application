import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../../redux/actions/taskActions';

const TaskItem = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });
    const dispatch = useDispatch();

    const priorityColors = {
        high: 'priority-high',
        medium: 'priority-medium',
        low: 'priority-low'
    };

    const handleToggleComplete = () => {
        dispatch(updateTask({
            ...task,
            completed: !task.completed
        }));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(task.id));
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTask({ ...task });
    };

    const handleSaveEdit = () => {
        dispatch(updateTask(editedTask));
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({
            ...editedTask,
            [name]: value
        });
    };

    const formatDueDate = (dateString) => {
        if (!dateString) return 'No due date';
        return new Date(dateString).toLocaleDateString();
    };

    if (!isEditing) {
        return (
            <div className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-header">
                    <div className="task-checkbox-title">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={handleToggleComplete}
                            className="task-checkbox"
                        />
                        <h3 className={task.completed ? 'completed-title' : ''}>
                            {task.title}
                        </h3>
                    </div>
                    <div className={`task-priority ${priorityColors[task.priority]}`}>
                        {task.priority}
                    </div>
                </div>

                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}

                {task.dueDate && (
                    <div className="task-due-date">
                        Due: {formatDueDate(task.dueDate)}
                    </div>
                )}

                <div className="task-actions">
                    <button onClick={handleEdit} className="btn-edit">
                        Edit
                    </button>
                    <button onClick={handleDelete} className="btn-delete">
                        Delete
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="task-item editing">
            <div className="edit-form">
                <div className="form-group">
                    <label htmlFor={`title-${task.id}`}>Title</label>
                    <input
                        type="text"
                        id={`title-${task.id}`}
                        name="title"
                        value={editedTask.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor={`description-${task.id}`}>Description</label>
                    <textarea
                        id={`description-${task.id}`}
                        name="description"
                        value={editedTask.description || ''}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor={`dueDate-${task.id}`}>Due Date</label>
                        <input
                            type="date"
                            id={`dueDate-${task.id}`}
                            name="dueDate"
                            value={editedTask.dueDate || ''}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`priority-${task.id}`}>Priority</label>
                        <select
                            id={`priority-${task.id}`}
                            name="priority"
                            value={editedTask.priority}
                            onChange={handleChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <div className="edit-actions">
                    <button onClick={handleSaveEdit} className="btn-save">
                        Save
                    </button>
                    <button onClick={handleCancelEdit} className="btn-cancel">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;