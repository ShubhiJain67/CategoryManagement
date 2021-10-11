import React from 'react'

const ButtonList = ({nodeList, setNodeList}) => {
    const Sort = (fieldName) => {
        console.log("Clicked " + fieldName)
        
        nodeList.sort((a, b) => a[fieldName] > b[fieldName] ? 1 : -1)
        setNodeList(nodeList)
        nodeList.map((node) => {
            console.log(node[fieldName])
        })
    }

    return (
        <div className="button-list">
            <h3>Sort By</h3>
            <div className="incline-content">
                <button className="button" onClick={() => Sort("title")}>Title</button>
                <button className="button" onClick={() => Sort("description")}>Description</button>
                <button className="button" onClick={() => Sort("created_at")}>Creation Time</button>
                <button className="button" onClick={() => Sort("last_updated_at")}>Last Updation Time</button>
            </div>
        </div>
    )
}

export default ButtonList
