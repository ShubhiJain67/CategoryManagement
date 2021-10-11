import React from 'react'
import NodeList from './NodeList.jsx'

const Tree = ({treeNodeLists}) => {
    console.log(treeNodeLists)
    const Tree = (treeNodeLists).map((nodeList) => {
        console.log(nodeList)
        return (
            <NodeList 
                nodeList={nodeList}
            />
        )
    })

    return (
        <div className="tree">
            {Tree}
        </div>
    )
}

export default Tree
