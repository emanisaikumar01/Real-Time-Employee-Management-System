# THRISUL EMPLOYEE MANAGEMENT SYSTEM

# RBAC MATRIX

## Organization Hierarchy

CEO
├── HR
├── Divisional Head
│   ├── Manager
│   │   ├── Executive
│   │   │   └── Employee

---

## Role Permissions

### CEO

Can:

* View all users
* Create/Edit/Delete users
* Create departments
* View all reports
* Assign tasks to anyone
* View all meetings
* View all leave requests
* Post notices

Cannot:

* None

---

### HR

Can:

* Hire employees
* Manage employee records
* Handle grievances
* Post notices
* View HR reports
* View leave records

Cannot:

* Assign project tasks
* View confidential management meetings

---

### Divisional Head

Can:

* Manage managers, executives, employees in division
* Assign tasks
* Approve leaves
* View division reports
* View division meetings

Cannot:

* Manage CEO
* Access other divisions

---

### Manager

Can:

* Manage team members
* Assign tasks
* Verify completed work
* Approve team leave requests
* View team reports

Cannot:

* Manage Divisional Head
* Access other teams

---

### Executive

Can:

* View assigned tasks
* Update task progress
* Apply leave
* Attend assigned meetings

Cannot:

* Assign tasks
* Approve leaves
* View reports

---

### Employee

Can:

* View assigned tasks
* Mark tasks completed
* Apply leave
* View personal profile
* Attend assigned meetings

Cannot:

* View reports
* Manage users
* Assign tasks

---

## Task Visibility

CEO:

* All tasks

HR:

* HR related tasks only

Divisional Head:

* Division tasks only

Manager:

* Team tasks only

Executive:

* Tasks assigned to self

Employee:

* Tasks assigned to self

---

## Meeting Visibility

CEO:

* All meetings

HR:

* HR meetings

Divisional Head:

* Division meetings

Manager:

* Team meetings

Executive:

* Meetings where invited

Employee:

* Meetings where invited

---

## Leave Workflow

Employee
↓
Manager Approval
↓
Divisional Head Approval
↓
Approved / Rejected

CEO:

* View only

HR:

* View and audit

---

## Notice Board

Post Notice:

* CEO
* HR

View Notice:

* Everyone

Types:

* Company Wide
* Department Specific
* Role Specific

---

## Future Modules

* Recruitment
* Employee Grievances
* Attendance
* Performance Reviews
* Payroll
* Asset Management
* Notifications
* Audit Logs
