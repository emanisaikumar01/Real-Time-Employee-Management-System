export const permissions = {

    CEO: {
        users: true,
        hireEmployee: true,
        assignTask: true,
        reports: true,
        approveLeave: false,
        noticePost: true,
        viewAllTasks: true,
        meetings: true,
    },

    HR: {
        users: true,
        hireEmployee: true,
        assignTask: false,
        reports: true,
        approveLeave: false,
        noticePost: true,
        viewAllTasks: false,
        meetings: true,
    },

    DIVISIONAL_HEAD: {
        users: true,
        hireEmployee: false,
        assignTask: true,
        reports: true,
        approveLeave: true,
        noticePost: false,
        viewAllTasks: false,
        meetings: true,
    },

    MANAGER: {
        users: false,
        hireEmployee: false,
        assignTask: true,
        reports: true,
        approveLeave: true,
        noticePost: false,
        viewAllTasks: false,
        meetings: true,
    },

    EXECUTIVE: {
        users: false,
        hireEmployee: false,
        assignTask: false,
        reports: false,
        approveLeave: false,
        noticePost: false,
        viewAllTasks: false,
        meetings: true,
    },

    EMPLOYEE: {
        users: false,
        hireEmployee: false,
        assignTask: false,
        reports: false,
        approveLeave: false,
        noticePost: false,
        viewAllTasks: false,
        meetings: true,
    },
};