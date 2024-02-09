import { useState, useEffect } from "react";
import { SessionUser } from "types/Session";
import { Modal } from "react-bootstrap";
import AttendanceUtilization from "components/Attendance/AttendanceUtilization";

interface Props {
    onClose: () => void;
    isModal: boolean;
    user: SessionUser;
};

const AttendanceModal = ({ user, isModal, onClose }: Props) => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    useEffect(() => {
        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                error => {
                    console.error(error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <Modal centered show={isModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">
                    {/* {getTimeRemainingUntilWorkStarts(user.shift_start)} */}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AttendanceUtilization latitude={latitude} longitude={longitude} />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary" onClick={onClose}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default AttendanceModal
