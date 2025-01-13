import { create } from 'zustand';
import { Employee } from '../types/employee';

interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Employee) => void;
  deleteEmployee: (id: string) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),
  updateEmployee: (id, updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? updatedEmployee : emp
      ),
    })),
  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
}));