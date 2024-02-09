import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { SessionUser } from 'types/Session';
import AttendanceModal from 'components/Modals/AttendanceModal';

interface Props {
    user: SessionUser | null;
};

const AttendanceModalIcon = ({ user }: Props) => {
    const [isAttendanceModal, setIsAttendanceModal] = useState<boolean>(false);
    const { isSuperUser } = useAuth();

    return (
        <>
            {!isSuperUser() &&
                <div className="pointer pe-3" onClick={() => setIsAttendanceModal(true)}>
                    <i className="icofont-finger-print fs-4 color-light-success" />
                </div>
            }
            {user && (
                <AttendanceModal
                    onClose={() => setIsAttendanceModal(false)}
                    isModal={isAttendanceModal}
                    user={user}
                />
            )}
        </>
    )
}

export default AttendanceModalIcon
