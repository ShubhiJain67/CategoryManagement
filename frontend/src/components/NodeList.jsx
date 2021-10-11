import React from 'react'
import Node from './Node.jsx'

const NodeList = ({formHandler, setFormHandler, nodeList, setUpdatedRootNodes, setEditItem, setNode}) => {
    const NodeList = (nodeList).map((node) => {
        return (
            <Node 
                node={node}
                formHandler={formHandler}
                setUpdatedRootNodes={setUpdatedRootNodes}
                setFormHandler={setFormHandler}
                setEditItem={setEditItem}
                setNode={setNode}
            />
        )
    })

    return (
        <div className="node-list">
            {NodeList}
        </div>
    )
}

export default NodeList
