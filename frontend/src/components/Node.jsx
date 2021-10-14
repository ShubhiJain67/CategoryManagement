import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:8000/categories'
})

const Node = ({setFormHandler, node, setUpdatedRootNodes, setEditItem, setNode}) => {
    console.log("Node Eneterance")

    const HandleNodeClick = (node) => {
        setNode(node)
    }

    const HandleSubcategoryAddition = (node) => {
        console.log(`Adding a Sub Category`)
        setFormHandler((formHandler) => {
            return {...formHandler, parent_category_id:node.id}
        })
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
        }).catch((exception) => {
            console.log("Error Occurred while deleting the data : " + exception)
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