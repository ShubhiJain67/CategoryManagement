import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:8000/categories'
})

const Node = ({formHandler, setFormHandler, node, setUpdatedRootNodes, setEditItem, setNode}) => {
    // let queue = [];

    // const apiResult = async (id, tempData, callBack) => {
    //     await api.get(`subcategories/${id}`,
    //     {
    //         headers: {'Access-Control-Allow-Origin': '*'},
    //         proxy: {
    //             host: 'localhost',
    //           port: 800
    //         }
    //     }).then((response) => {
    //         callBack(response)
    //     })
    // }

    // const queueIterator = async (queue, callback) => {
    //     let tempData = []
    //     await queue.map((queueElement) => {
    //         console.log("2 : Queue Element : " + queueElement)
    //         apiResult(queueElement.id, tempData, (response) => {
    //             console.log("3 Response Data " + response.data);
    //             tempData = [[...tempData], [...response.data]]
    //         })
    //     })
    //     console.log("4 Temp Data : " + tempData)
    //     callback(tempData)
    // }

    const HandleNodeClick = (node) => {
        setNode(node)
    }

    const HandleSubcategoryAddition = (node) => {
        console.log(`Adding a Sub Category`)
        setFormHandler({...formHandler, parent_category_id:node.id})
        setEditItem({status : false, node : node})
    }

    const HandleCategoryEdit = (node) => {        
        console.log(`Editing a Category`)
        setFormHandler({id:node.id, title:node.title, description:node.description, parent_category_id:node.parent_category_id})
        setEditItem({status : true, node : node})
    }

    const HandleCategoryDelete = (node) => {
        console.log(`Deleting a Category`)
        api.delete(`/${node.id}`,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            proxy: {
                host: 'localhost',
                port: 800
            }
        }).then(() => {
            setUpdatedRootNodes(Math.floor(Math.random() * 1000001))
            console.log(`Deleted category : ${node.title} - ${node.description}` )
        })
    }

    return (
        <div className="node-wrapper" key={node.id}>
            <div className="node"  onClick={() => HandleNodeClick(node)}>
                <h3>{node.title}</h3>
                <p>{node.description}</p>
            </div>
            <div className="task-buttons">
                <button className="button-add task-button" onClick={() => HandleSubcategoryAddition(node)}>
                    <i className="fa fa-plus"></i>
                </button>
                <button className="button-edit task-button" onClick={() => HandleCategoryEdit(node)}>
                    <i className="fa fa-edit"></i>
                </button>
                <button className="button-delete task-button" onClick={() => HandleCategoryDelete(node)}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default Node