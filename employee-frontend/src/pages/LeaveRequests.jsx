import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import {
    getLeaveRequests,
    createLeaveRequest,
    updateLeaveStatus,
} from "../services/leaveRequestService";

function LeaveRequests() {

    const { user } = useAuth();

    const role = user?.roleName;

    const [leaveRequests, setLeaveRequests] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [leaveData, setLeaveData] = useState({
        startDate: "",
        endDate: "",
        reason: "",
    });

    const loadLeaveRequests = async () => {

        try {

            const data = await getLeaveRequests();

            console.log("Leave Data:", data);

            const list = Array.isArray(data)
                ? data
                : data.content || [];

            setLeaveRequests(list);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {
        loadLeaveRequests();
    }, []);

    const submitLeave = async () => {

        try {

            await createLeaveRequest({
                userId: user.id,
                startDate: leaveData.startDate,
                endDate: leaveData.endDate,
                reason: leaveData.reason,
                status: "PENDING",
            });

            alert("Leave Request Submitted");

            setShowForm(false);

            setLeaveData({
                startDate: "",
                endDate: "",
                reason: "",
            });

            loadLeaveRequests();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to submit leave request"
            );
        }
    };

    const handleStatusUpdate = async (
        id,
        status
    ) => {

        try {

            await updateLeaveStatus(
                id,
                status
            );

            loadLeaveRequests();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to update leave status"
            );
        }
    };

    return (
        <section className="page-section">

            <div className="section-header">

                <div>
                    <p className="eyebrow">
                        Approvals
                    </p>

                    <h2>
                        Leave Requests
                    </h2>
                </div>

                {(role === "EMPLOYEE" ||
                    role === "EXECUTIVE") && (

                    <button
                        onClick={() =>
                            setShowForm(true)
                        }
                    >
                        Apply Leave
                    </button>

                )}

            </div>

            {showForm && (

                <div className="card">

                    <h3>
                        Apply Leave
                    </h3>

                    <input
                        type="date"
                        value={leaveData.startDate}
                        onChange={(e) =>
                            setLeaveData({
                                ...leaveData,
                                startDate:
                                e.target.value,
                            })
                        }
                    />

                    <input
                        type="date"
                        value={leaveData.endDate}
                        onChange={(e) =>
                            setLeaveData({
                                ...leaveData,
                                endDate:
                                e.target.value,
                            })
                        }
                    />

                    <textarea
                        placeholder="Reason"
                        value={leaveData.reason}
                        onChange={(e) =>
                            setLeaveData({
                                ...leaveData,
                                reason:
                                e.target.value,
                            })
                        }
                    />

                    <button
                        onClick={submitLeave}
                    >
                        Submit Leave
                    </button>

                </div>

            )}

            {(role === "EMPLOYEE" ||
                role === "EXECUTIVE") && (

                <div className="card">

                    <h3>
                        My Leave Requests
                    </h3>

                    {leaveRequests.filter(
                        (leave) =>
                            leave.userId ===
                            user.id
                    ).length === 0 && (
                        <p>
                            No leave requests found.
                        </p>
                    )}

                    {leaveRequests
                        .filter(
                            (leave) =>
                                leave.userId ===
                                user.id
                        )
                        .map((leave) => (

                            <div
                                key={leave.id}
                                style={{
                                    marginBottom:
                                        "15px",
                                }}
                            >

                                <p>
                                    <strong>
                                        From:
                                    </strong>{" "}
                                    {leave.startDate}
                                </p>

                                <p>
                                    <strong>
                                        To:
                                    </strong>{" "}
                                    {leave.endDate}
                                </p>

                                <p>
                                    <strong>
                                        Reason:
                                    </strong>{" "}
                                    {leave.reason}
                                </p>

                                <p>
                                    <strong>
                                        Status:
                                    </strong>{" "}
                                    {leave.status}
                                </p>

                                {leave.status === "PENDING" && (

                                    <button
                                        onClick={() =>
                                            handleStatusUpdate(
                                                leave.id,
                                                "CANCELLED"
                                            )
                                        }
                                    >
                                        Cancel
                                    </button>

                                )}

                                <hr />

                            </div>

                        ))}

                </div>

            )}

            {(role === "MANAGER" ||
                role === "DIVISIONAL_HEAD") && (

                <div className="card">

                    <h3>
                        Pending Leave Approvals
                    </h3>

                    {leaveRequests
                        .filter(
                            (leave) =>
                                leave.status ===
                                "PENDING"
                        )
                        .map((leave) => (

                            <div
                                key={leave.id}
                                style={{
                                    marginBottom:
                                        "15px",
                                }}
                            >

                                <p>
                                    <strong>
                                        Employee:
                                    </strong>{" "}
                                    {leave.userName}
                                </p>

                                <p>
                                    <strong>
                                        From:
                                    </strong>{" "}
                                    {leave.startDate}
                                </p>

                                <p>
                                    <strong>
                                        To:
                                    </strong>{" "}
                                    {leave.endDate}
                                </p>

                                <p>
                                    <strong>
                                        Reason:
                                    </strong>{" "}
                                    {leave.reason}
                                </p>

                                <button
                                    onClick={() =>
                                        handleStatusUpdate(
                                            leave.id,
                                            "APPROVED"
                                        )
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    style={{
                                        marginLeft:
                                            "10px",
                                    }}
                                    onClick={() =>
                                        handleStatusUpdate(
                                            leave.id,
                                            "REJECTED"
                                        )
                                    }
                                >
                                    Reject
                                </button>

                                <hr />

                            </div>

                        ))}

                </div>

            )}

            {(role === "CEO" ||
                role === "HR") && (

                <div className="card">

                    <h3>
                        All Leave Requests
                    </h3>

                    {leaveRequests.length === 0 ? (

                        <p>
                            No leave requests found.
                        </p>

                    ) : (

                        leaveRequests.map((leave) => (

                            <div
                                key={leave.id}
                                style={{
                                    marginBottom:
                                        "15px",
                                }}
                            >

                                <p>
                                    <strong>
                                        Employee:
                                    </strong>{" "}
                                    {leave.userName}
                                </p>

                                <p>
                                    <strong>
                                        Status:
                                    </strong>{" "}
                                    {leave.status}
                                </p>

                                <hr />

                            </div>

                        ))

                    )}

                </div>

            )}

        </section>
    );
}

export default LeaveRequests;