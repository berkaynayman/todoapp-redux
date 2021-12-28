import React from 'react'

function Error({message}) {
    return (
        <div style={{ fontSize: 20, padding: 10, textAlignLast: "center", color: "red" }}>
            Error: {message}
        </div>
    )
}

export default Error
