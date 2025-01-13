export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  salary: number;
}

export type EmployeeFormData = Omit<Employee, 'id'>;