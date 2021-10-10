import React from 'react'
import './nodeList.css'
import Node from '../node/node'

const NodeList = ({nodeList}) => {
    console.log(nodeList)
    const NodeList = (nodeList).map((node) => {
        return (
            <Node 
                node={node}
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
