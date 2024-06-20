import React, { useState, useEffect } from 'react';

export default function PchCategoryForm({ onAdd, onEdit, editingCategory, setEditingCategory }) {
  const [category, setCategory] = useState({ pchCategoryName: '', pchCategoryStatus: true });

  // Update form fields when editingCategory changes
  useEffect(() => {
    if (editingCategory) {
      setCategory(editingCategory);
    } else {
      setCategory({ pchCategoryName: '', pchCategoryStatus: true });
    }
  }, [editingCategory]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategory(prevCategory => ({
      ...prevCategory,
      [name]: type === 'checkbox' ? checked : (name === 'pchCategoryStatus' ? (value === 'true') : value),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      onEdit(category);
    } else {
      onAdd(category);
    }
    setEditingCategory(null);
    setCategory({ pchCategoryName: '', pchCategoryStatus: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">CategoryName</span>
          <input
            type="text"
            name="pchCategoryName"
            value={category.pchCategoryName}
            onChange={handleChange}
            className="form-control"
            placeholder="CategoryName"
            aria-label="CategoryName"
            aria-describedby="basic-addon1"
            required
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">CategoryStatus</span>
          <select
            name="pchCategoryStatus"
            value={category.pchCategoryStatus}
            onChange={handleChange}
            className="form-control"
          >
            <option value={true}>Hiển thị</option>
            <option value={false}>Tạm khóa</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-success">Ghi lại</button>
        <button type="button" className="btn btn-secondary" onClick={() => setEditingCategory(null)}>Đóng</button>
      </form>
    </div>
  );
}
