import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setPriorityFilter } from '../../redux/actions/taskActions';

const TaskFilters = () => {
    const dispatch = useDispatch();
    const { filter, priorityFilter } = useSelector(state => state.tasks);

    const handleFilterChange = (newFilter) => {
        dispatch(setFilter(newFilter));
    };

    const handlePriorityFilterChange = (newPriorityFilter) => {
        dispatch(setPriorityFilter(newPriorityFilter));
    };

    return (
        <div className="task-filters">
            <div className="filter-group">
                <span className="filter-label">Show:</span>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('active')}
                    >
                        Active
                    </button>
                    <button
                        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('completed')}
                    >
                        Completed
                    </button>
                </div>
            </div>

            <div className="filter-group">
                <span className="filter-label">Priority:</span>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${priorityFilter === 'all' ? 'active' : ''}`}
                        onClick={() => handlePriorityFilterChange('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn priority-high ${priorityFilter === 'high' ? 'active' : ''}`}
                        onClick={() => handlePriorityFilterChange('high')}
                    >
                        High
                    </button>
                    <button
                        className={`filter-btn priority-medium ${priorityFilter === 'medium' ? 'active' : ''}`}
                        onClick={() => handlePriorityFilterChange('medium')}
                    >
                        Medium
                    </button>
                    <button
                        className={`filter-btn priority-low ${priorityFilter === 'low' ? 'active' : ''}`}
                        onClick={() => handlePriorityFilterChange('low')}
                    >
                        Low
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;