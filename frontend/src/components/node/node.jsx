import React from 'react'
import './node.css'
import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:8000'
})

const Node = ({node}) => {
    let queue = [];

    const apiResult = async (id, tempData, callBack) => {
        await api.get(`subcategories/${id}`,
        {
            headers: {'Access-Control-Allow-Origin': '*'},
            proxy: {
                host: 'localhost',
              port: 800
            }
        }).then((response) => {
            callBack(response)
        })
    }

    const queueIterator = async (queue, callback) => {
        let tempData = []
        await queue.map((queueElement) => {
            console.log("2 : Queue Element : " + queueElement)
            apiResult(queueElement.id, tempData, (response) => {
                console.log("3 Response Data " + response.data);
                tempData = [[...tempData], [...response.data]]
            })
        })
        console.log("4 Temp Data : " + tempData)
        callback(tempData)
    }

    const HandleNodeClick = (root) => {
        let treeNodeList = []
        queue = [root]
        while(queue.length > 0){
            console.log("1 Queue : " + queue)
            queueIterator(queue, (tempQueue) => {
                queue = [...tempQueue]
                tempQueue = []
                console.log("5 Queue : " + queue)
            })
        }
        console.log("5 Tree Node List : " + treeNodeList)
    }

    return (
        <div key={node.id} className="node" onClick={() => HandleNodeClick(node)}>
            <h3>{node.title}</h3>
            <p>{node.description}</p>
        </div>
    )
}

export default Node