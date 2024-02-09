import React from 'react'
import { Session } from "types/Session";

interface Props {
    session: Session;
};

const Header = ({ session }: Props) => {
    return (
        <div>
            Header
        </div>
    )
}

export default Header
