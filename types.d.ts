type AttendanceList = {
  checkIn: string;
  checkOut: string;
  date: string;
  scanStatus: string;
  user: {
    name: string;
    role: string;
    uid: string;
  };
};

type Employee = {
  name: string;
  uid: string;
  role: string;
};

type UID = {
  uid: string;
  isUsed: boolean;
  employeeName: string;
  employeeUID: string;
};

type DashboardTypes = {
  stats: {
    totalEmployees: number;
    presentEmployees: number;
    absentEmployees: number;
    employeesOnLeave: number;
  };
  liveStatus: {
    absent: [];
    present: [];
    onLeave: [];
  };
  pendingLeaves: Array<{
    user: {
      name: string;
      email: string;
      uid: string;
    };
    startDate: Date;
    endDate: Date;
    reason: string;
    status: string;
  }>;
  complaintStats: {
    new: number;
    inProcess: number;
    resolved: number;
  };
  recentComplaints: Array<{
    subject: string;
    description: string;
    user: {
      name: string;
      email: string;
      uid: string;
    };
  }>;
  notifications: {
    newLeaves: number;
    newComplaints: number;
  };
};
