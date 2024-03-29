import React from 'react'

const ButtonList = ({setNodeList}) => {
    console.log("Button List eneterance ")
    const Sort = (fieldName) => {
        setNodeList((nodeList)=> {
            nodeList.sort((a, b) => a[fieldName] > b[fieldName] ? 1 : -1)
            return [...nodeList]
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
