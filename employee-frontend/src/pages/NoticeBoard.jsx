import { useEffect, useState } from "react";

import {
    getNotices,
    createNotice,
} from "../services/noticeService";

function NoticeBoard() {

    const user = JSON.parse(
        localStorage.getItem("employee_user")
    );

    const role = user?.roleName;

    const [notices, setNotices] = useState([]);

    const [showForm, setShowForm] =
        useState(false);

    const [noticeData, setNoticeData] =
        useState({
            title: "",
            description: "",
        });

    const loadNotices = async () => {

        try {

            const response = await getNotices();

            console.log("NOTICE API:", response);

            setNotices(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {
        loadNotices()
    }, []);

    const handleCreateNotice = async () => {

        if (
            !noticeData.title.trim() ||
            !noticeData.description.trim()
        ) {
            alert(
                "Please enter Title and Description"
            );
            return;
        }

        try {

            await createNotice({
                title: noticeData.title,
                description: noticeData.description,
                createdById: user.id,
            });

            alert("Notice Published");

            setShowForm(false);

            setNoticeData({
                title: "",
                description: "",
            });

            await loadNotices();

        } catch (error) {

            console.error(error);

            alert("Failed to publish notice");
        }
    };
    return (
        <section className="page-section">

            <div className="section-header">

                <div>

                    <p className="eyebrow">
                        Communication
                    </p>

                    <h2>
                        Notice Board
                    </h2>

                </div>

                {(role === "CEO" ||
                    role === "HR") && (

                    <button
                        onClick={() =>
                            setShowForm(
                                !showForm
                            )
                        }
                    >
                        Create Notice
                    </button>

                )}

            </div>

            {showForm && (

                <div className="card">

                    <h3>
                        New Notice
                    </h3>

                    <input
                        type="text"
                        placeholder="Title"
                        value={
                            noticeData.title
                        }
                        onChange={(e) =>
                            setNoticeData({
                                ...noticeData,
                                title:
                                e.target
                                    .value,
                            })
                        }
                    />

                    <textarea
                        placeholder="Description"
                        value={
                            noticeData.description
                        }
                        onChange={(e) =>
                            setNoticeData({
                                ...noticeData,
                                description:
                                e.target
                                    .value,
                            })
                        }
                    />

                    <button
                        onClick={
                            handleCreateNotice
                        }
                    >
                        Publish Notice
                    </button>

                </div>

            )}

            <div className="card">


                <h3>
                    Company Notices
                </h3>

                {notices.length === 0 ? (

                    <p>
                        No notices available.
                    </p>

                ) : (

                    notices.map(
                        (notice) => (

                            <div
                                key={
                                    notice.id
                                }
                                style={{
                                    marginBottom:
                                        "20px",
                                }}
                            >

                                <h4>
                                    {
                                        notice.title
                                    }
                                </h4>

                                <p>
                                    {
                                        notice.description
                                    }
                                </p>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                        notice.createdAt
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Posted By:</strong>{" "}
                                    {notice.createdByName}
                                </p>

                                <hr />

                            </div>
                        )
                    )

                )}

            </div>

        </section>
    );
}

export default NoticeBoard;