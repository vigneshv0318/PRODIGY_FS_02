import React, { useState } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useEmployeeStore } from '../store/employeeStore';
import { EmployeeList } from './EmployeeList';
import { EmployeeForm } from './EmployeeForm';
import type { Employee, EmployeeFormData } from '../types/employee';

export function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const logout = useAuthStore((state) => state.logout);
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployeeStore();

  const handleSubmit = (data: EmployeeFormData) => {
    if (selectedEmployee) {
      updateEmployee(selectedEmployee.id, { ...data, id: selectedEmployee.id });
    } else {
      addEmployee({ ...data, id: crypto.randomUUID() });
    }
    handleCloseForm();
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isFormOpen ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">
              {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <EmployeeForm
              onSubmit={handleSubmit}
              initialData={selectedEmployee ?? undefined}
              onCancel={handleCloseForm}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </button>
            </div>
            <div className="bg-white shadow rounded-lg">
              <EmployeeList
                employees={employees}
                onEdit={handleEdit}
                onDelete={deleteEmployee}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}