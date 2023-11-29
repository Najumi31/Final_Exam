import React, { useState } from 'react';

const Category = ({ categories, addCategory, deleteCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Are you sure you want to delete the category "${category}"?`)) {
      deleteCategory(category);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Category Management</h2>
      <div className="mb-3">
        <label htmlFor="newCategory" className="form-label">
          New Category:
        </label>
        <div className="input-group">
          <input
            type="text"
            id="newCategory"
            className="form-control"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
          />
          <button className="btn btn-primary" onClick={handleAddCategory}>
            Add Category
          </button>
        </div>
      </div>

      <h4>Existing Categories:</h4>
      <ul className="list-group">
        {categories.map((category, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {category}
            <button className="btn btn-danger" onClick={() => handleDeleteCategory(category)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
