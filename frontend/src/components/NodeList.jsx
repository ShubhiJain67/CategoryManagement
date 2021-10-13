import React from 'react'
import Node from './Node.jsx'

const NodeList = ({setFormHandler, nodeList, setUpdatedRootNodes, setEditItem, setNode}) => {
    console.log("Node List Eneterance")
    const NodeList = ((nodeList).map((node) => {
        return (
            <Node 
                node={node}
                setUpdatedRootNodes={setUpdatedRootNodes}
                setFormHandler={setFormHandler}
                setEditItem={setEditItem}
                setNode={setNode}
            />
        )
    }))

    return (
        <div className="node-list">
            {NodeList}
        </div>
    )
}

export default NodeList
