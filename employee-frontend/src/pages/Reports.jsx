import { useEffect, useState } from "react";
import {
    getReports,
    createReport,
    deleteReport
} from "../services/reportService";

function Reports() {

    const [reports, setReports] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const user = JSON.parse(
        localStorage.getItem("employee_user")
    );

    const role = user?.roleName;

    const [reportData, setReportData] = useState({
        title: "",
        content: "",
    });

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {

        try {

            const data = await getReports();

            let list = Array.isArray(data)
                ? data
                : data.content || [];

            if (
                role === "EMPLOYEE" ||
                role === "EXECUTIVE"
            ) {

                list = list.filter(
                    (report) =>
                        Number(report.employeeId) ===
                        Number(user.id)
                );
            }

            setReports(list);

        } catch (error) {

            console.error(error);

            setReports([]);
        }
    };

    const handleCreateReport = async () => {

        if (
            !reportData.title ||
            !reportData.content
        ) {

            alert("Please fill all fields");
            return;
        }

        try {

            await createReport({
                ...reportData,
                employeeId: user.id
            });

            alert(
                "Report Created Successfully"
            );

            setReportData({
                title: "",
                content: ""
            });

            setShowForm(false);

            loadReports();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to create report"
            );
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this report?"
            );

        if (!confirmDelete) return;

        try {

            await deleteReport(id);

            alert(
                "Report Deleted Successfully"
            );

            loadReports();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to delete report"
            );
        }
    };

    return (
        <section className="page-section">

            <div className="section-header">

                <div>

                    <p className="eyebrow">
                        Insights
                    </p>

                    <h2>
                        Reports
                    </h2>

                </div>

                {(role === "EMPLOYEE" ||
                    role === "EXECUTIVE") && (

                    <button
                        onClick={() =>
                            setShowForm(!showForm)
                        }
                    >
                        Create Report
                    </button>

                )}

            </div>

            {showForm && (

                <div className="card">

                    <h3>
                        Create Report
                    </h3>

                    <input
                        type="text"
                        placeholder="Report Title"
                        value={reportData.title}
                        onChange={(e) =>
                            setReportData({
                                ...reportData,
                                title: e.target.value
                            })
                        }
                    />

                    <textarea
                        placeholder="Report Content"
                        value={reportData.content}
                        onChange={(e) =>
                            setReportData({
                                ...reportData,
                                content: e.target.value
                            })
                        }
                    />

                    <button
                        onClick={
                            handleCreateReport
                        }
                    >
                        Save Report
                    </button>

                </div>

            )}

            {reports.length === 0 ? (

                <div className="card">

                    <h3>
                        No Reports Available
                    </h3>

                    <p>
                        Reports created by employees will appear here.
                    </p>

                </div>

            ) : (

                <div className="card-grid">

                    {reports.map((report) => (

                        <div
                            key={report.id}
                            className="card"
                        >

                            <h3>
                                {report.title}
                            </h3>

                            <p>
                                {report.content}
                            </p>

                            <p>
                                <strong>
                                    Submitted By:
                                </strong>{" "}
                                {report.employeeName}
                            </p>

                            <p>
                                <strong>
                                    Report ID:
                                </strong>{" "}
                                {report.id}
                            </p>

                            <p>
                                <strong>
                                    Created:
                                </strong>{" "}
                                {report.createdAt
                                    ? new Date(
                                        report.createdAt
                                    ).toLocaleString()
                                    : "N/A"}
                            </p>

                            {(role === "CEO" ||
                                role === "HR") && (

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            report.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </section>
    );
}

export default Reports;