import React, { Dispatch, SetStateAction } from 'react'
import { Alert, Button } from 'reactstrap'

interface AlertProps {
    text: string,
    color: string
    setVisibleAlert: Dispatch<SetStateAction<boolean>>
}
const AlertMessage: React.FC<AlertProps> = (
    { text, color, setVisibleAlert }
) => {
    return (
        <>
            <Alert key={Math.random()}
                className="default-alerts"
                style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 9999, width: "auto", backgroundColor: color, border: "none" }}>
                <Button
                    color=""
                    type="button"
                    onClick={() => { }}
                    className="btn-close"
                >
                </Button>
                {" "}
                {text}
            </Alert>
        </>
    )
}

export default AlertMessage