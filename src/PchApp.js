import React, { useEffect, useState } from 'react';
import axios from './api/PchApi'; // Assuming axios instance is configured correctly
import './App.css';
import PchCategoryList from './components/PchCategoryList';
import PchCategoryForm from './components/PchCategoryForm';

function PchApp() {
  const [pchCategories, setPchCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Function to fetch categories from API
  const pchGetCategories = async () => {
    try {
      const pchCateResponse = await axios.get('PchCategory');
      setPchCategories(pchCateResponse.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Function to add a new category
  const pchAddCategory = async (newCategory) => {
    try {
      const response = await axios.post('/pchCategory', newCategory);
      setPchCategories([...pchCategories, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Function to update an existing category
  const pchUpdateCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(`/pchCategory/${updatedCategory.pchId}`, updatedCategory);
      setPchCategories(pchCategories.map(cat => cat.pchId === updatedCategory.pchId ? response.data : cat));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Function to delete a category
  const pchDeleteCategory = async (pchId) => {
    try {
      await axios.delete(`/pchCategory/${pchId}`);
      setPchCategories(pchCategories.filter(cat => cat.pchId !== pchId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    pchGetCategories();
  }, []);

  return (
    <div className="container border my-3">
      <h1>Phạm Công Hiếu - Call API</h1>
      <PchCategoryList
        renderpchCategories={pchCategories}
        onDelete={pchDeleteCategory}
        onEdit={setEditingCategory}
      />
      <hr />
      <PchCategoryForm
        onAdd={pchAddCategory}
        onEdit={pchUpdateCategory}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
      />
    </div>
  );
}

export default PchApp;
