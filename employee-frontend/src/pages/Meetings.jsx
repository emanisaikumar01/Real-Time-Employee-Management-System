import { useEffect, useState } from "react";
import {
    getMeetings,
    createMeeting,
    deleteMeeting
} from "../services/meetingService";

function Meetings() {

    const [meetings, setMeetings] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const user = JSON.parse(
        localStorage.getItem("employee_user")
    );

    const role = user?.roleName;

    const [meetingData, setMeetingData] = useState({
        title: "",
        agenda: "",
        meetingDate: "",
        meetingTime: "",
        createdById: user?.id,
    });

    const loadMeetings = async () => {

        try {

            const response =
                await getMeetings();

            setMeetings(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        loadMeetings();

    }, []);

    const handleCreateMeeting = async () => {

        if (
            !meetingData.title.trim() ||
            !meetingData.agenda.trim() ||
            !meetingData.meetingDate ||
            !meetingData.meetingTime
        ) {
            alert("Please fill all fields");
            return;
        }

        try {

            await createMeeting({
                ...meetingData,
                createdById: user.id,
            });

            alert("Meeting Created Successfully");

            setShowForm(false);

            setMeetingData({
                title: "",
                agenda: "",
                meetingDate: "",
                meetingTime: "",
                createdById: user.id,
            });

            loadMeetings();

        } catch (error) {

            console.error(error);

            alert("Failed to create meeting");
        }
    };

    const handleDelete =
        async (id) => {

            try {

                await deleteMeeting(id);

                loadMeetings();

            } catch (error) {

                console.error(error);

                alert(
                    "Failed to delete meeting"
                );
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
                        Meetings
                    </h2>
                </div>

                {(role === "CEO" ||
                    role === "HR" ||
                    role === "MANAGER" ||
                    role === "DIVISIONAL_HEAD") && (

                    <button
                        onClick={() =>
                            setShowForm(!showForm)
                        }
                    >
                        Create Meeting
                    </button>

                )}

            </div>

            {showForm && (

                <div className="card">

                    <h3>
                        Schedule Meeting
                    </h3>

                    <input
                        type="text"
                        placeholder="Meeting Title"
                        value={meetingData.title}
                        onChange={(e) =>
                            setMeetingData({
                                ...meetingData,
                                title: e.target.value,
                            })
                        }
                    />

                    <textarea
                        placeholder="Agenda"
                        value={meetingData.agenda}
                        onChange={(e) =>
                            setMeetingData({
                                ...meetingData,
                                agenda: e.target.value,
                            })
                        }
                    />

                    <input
                        type="date"
                        value={
                            meetingData.meetingDate
                        }
                        onChange={(e) =>
                            setMeetingData({
                                ...meetingData,
                                meetingDate:
                                e.target.value,
                            })
                        }
                    />

                    <input
                        type="time"
                        value={
                            meetingData.meetingTime
                        }
                        onChange={(e) =>
                            setMeetingData({
                                ...meetingData,
                                meetingTime:
                                e.target.value,
                            })
                        }
                    />

                    <button
                        onClick={
                            handleCreateMeeting
                        }
                    >
                        Save Meeting
                    </button>

                </div>

            )}

            {meetings.length === 0 ? (

                <div className="card">

                    <h3>
                        No Meetings Scheduled
                    </h3>

                    <p>
                        There are currently no
                        upcoming meetings.
                    </p>

                </div>

            ) : (

                <div className="card-grid">

                    {meetings.map(
                        (meeting) => (

                            <div
                                key={meeting.id}
                                className="card"
                            >

                                <h3>
                                    {meeting.title}
                                </h3>

                                <p>
                                    {
                                        meeting.agenda
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Date:
                                    </strong>{" "}
                                    {
                                        meeting.meetingDate
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Time:
                                    </strong>{" "}
                                    {
                                        meeting.meetingTime
                                    }
                                </p>
                                <p>
                                    <strong>Created By:</strong>{" "}
                                    {meeting.createdByName}
                                </p>

                                {(role ===
                                    "CEO" ||
                                    role ===
                                    "HR", role === "DIVISIONAL_HEAD") && (
                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                meeting.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                )}

                            </div>

                        )
                    )}

                </div>

            )}

        </section>
    );
}

export default Meetings;