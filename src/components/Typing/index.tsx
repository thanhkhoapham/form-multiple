import { ReactElement } from "react";

import "./styles.scss";

const Typing = (): ReactElement => {
    return <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
    </div>
}

export default Typing;