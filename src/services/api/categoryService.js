import categoriesData from "@/services/mockData/categories.json"
import { toast } from "react-toastify"

let categories = [...categoriesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(150)
    // Get categories from localStorage if available, otherwise use mock data
    const savedCategories = localStorage.getItem("taskflow_categories")
    if (savedCategories) {
      categories = JSON.parse(savedCategories)
    }
    return [...categories]
  },

  async getById(id) {
    await delay(100)
    const savedCategories = localStorage.getItem("taskflow_categories")
    if (savedCategories) {
      categories = JSON.parse(savedCategories)
    }
    const category = categories.find(cat => cat.Id === parseInt(id))
    return category ? { ...category } : null
  },

  async create(categoryData) {
    await delay(200)
    const savedCategories = localStorage.getItem("taskflow_categories")
    if (savedCategories) {
      categories = JSON.parse(savedCategories)
    }

    // Check if category name already exists
    const existingCategory = categories.find(cat => 
      cat.name.toLowerCase() === categoryData.name.toLowerCase()
    )
    if (existingCategory) {
      toast.error("Category already exists")
      return null
    }

    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) + 1 : 1
    const newCategory = {
      Id: newId,
      name: categoryData.name.toLowerCase(),
      color: categoryData.color || "#6366f1",
      taskCount: 0
    }

    categories.push(newCategory)
    localStorage.setItem("taskflow_categories", JSON.stringify(categories))
    
    toast.success("Category created successfully!")
    return { ...newCategory }
  },

  async update(id, categoryData) {
    await delay(200)
    const savedCategories = localStorage.getItem("taskflow_categories")
    if (savedCategories) {
      categories = JSON.parse(savedCategories)
    }

    const categoryIndex = categories.findIndex(cat => cat.Id === parseInt(id))
    if (categoryIndex === -1) {
      toast.error("Category not found")
      return null
    }

    const updatedCategory = {
      ...categories[categoryIndex],
      ...categoryData
    }

    categories[categoryIndex] = updatedCategory
    localStorage.setItem("taskflow_categories", JSON.stringify(categories))
    
    toast.success("Category updated successfully!")
    return { ...updatedCategory }
  },

  async delete(id) {
    await delay(200)
    const savedCategories = localStorage.getItem("taskflow_categories")
    if (savedCategories) {
      categories = JSON.parse(savedCategories)
    }

    const categoryIndex = categories.findIndex(cat => cat.Id === parseInt(id))
    if (categoryIndex === -1) {
      toast.error("Category not found")
      return false
    }

    const deletedCategory = categories[categoryIndex]
    categories.splice(categoryIndex, 1)
    localStorage.setItem("taskflow_categories", JSON.stringify(categories))
    
    toast.success(`Category "${deletedCategory.name}" deleted successfully`)
    return true
  }
}