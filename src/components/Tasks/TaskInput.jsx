import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/actions/taskActions';

const TaskInput = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            description,
            dueDate: dueDate || null,
            priority,
            isOutdoor: false,
            completed: false,
        };

        dispatch(addTask(newTask));

        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
    };

    return (
        <div className="task-input-container">
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label htmlFor="title">Task Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description (Optional)</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add details about this task"
                    ></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date (Optional)</label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn-primary">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default TaskInput;