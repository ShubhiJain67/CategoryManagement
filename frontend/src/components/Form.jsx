import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:8000/categories'
})

const Form = ({formHandler, setFormHandler, editItem, setEditItem, setUpdatedRootNodes, nodeList}) => {
    console.log("Form Eneterance")
    
    const editCategory = (url) => {
        console.log("Editing a category")
        console.log(formHandler)
        api.put(url,
        {
            title:`${formHandler.title}`,
            description: `${formHandler.description}`,
            parent_category_id: formHandler.parent_category_id
        },
        {
            headers: {'Access-Control-Allow-Origin': '*'},
            proxy: {
              host: 'localhost',
              port: 800
            }
        }
        ).then((response) => {
            if(response.status >= 200 && response.status < 300){
                setUpdatedRootNodes(Math.floor(Math.random() * 1000001))
                console.log("Sucessfully edited the category : " + response.status)
            }
            else{
                console.log("Error Occurred while editing the data : " + response.status)
            }
            HandleReset()
        }).catch((exception) => {
            HandleReset()
            console.log("Error Occurred while editing the data : " + exception)
        })
    }

    const addCategory = (url) => {
        console.log("Adding a Category")
        console.log(url)
        api.post(`${url}`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                proxy: {
                    host: 'localhost',
                    port: 800
                }
            }).then((response) => {
                if(response.status >= 200 && response.status < 300){
                    setUpdatedRootNodes(Math.floor(Math.random() * 1000001))
                    console.log(`Added Category Sucessfylly : ${response.data?.title} - ${response.data?.description}`)
                }
                else{
                    console.log("Error occured while Adding a Category : " + response.status)
                }
                HandleReset()
            }).catch((exception) => {
                HandleReset()
                console.log("Error Occurred while adding the data : " + exception)
            })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let apiEndPoints = `/`
        if(editItem.status){
            apiEndPoints=`/${editItem.node.id}`
            editCategory(apiEndPoints)
        }
        else{
            if(formHandler.parent_category_id !== -1){
                apiEndPoints=`/${formHandler.parent_category_id}`
            }
            apiEndPoints += `?title=${formHandler.title}&description=${formHandler.description}`
            addCategory(apiEndPoints)
        }
    }
    const HandleReset = () => {
        setFormHandler({...formHandler, id:"", title:"", description:"", parent_category_id:-1, created_at:"", last_updated_at:""})
        setEditItem({status : false, node : null})
    }
    
    return (
        <div className="form-wrapper ">
            <form onSubmit={handleSubmit}>
                <div className="hidden">
                    <input 
                        type="text" 
                        placeholder="ID"
                        className="task-input"
                        value={formHandler.id}
                        onChange={(event) => {setFormHandler({...formHandler, id:event.target.value})}}
                    />
                </div>
                <div className="full-width">
                    <input 
                        type="text" 
                        placeholder="Title"
                        className="task-input"
                        required
                        value={formHandler.title}
                        onChange={(event) => {setFormHandler({...formHandler, title:event.target.value})}}
                    />
                </div>
                <div className="full-width">
                    <input 
                        type="text" 
                        placeholder="Description" 
                        className="task-input"
                        value={formHandler.description}
                        onChange={(event) => setFormHandler({...formHandler, description:event.target.value})}
                    />
                </div>
                <div className="full-width">
                    <select className="task-input" name="cars" id="parent_category" value={formHandler.parent_category_id} onChange={(event) => setFormHandler({...formHandler, parent_category_id:event.target.value})}>
                        <option value={-1} key={-1}>Root</option>
                        {nodeList.map((node) => 
                            <option value={node.id} key={node.id}>{node.title}</option>
                        )}
                    </select>
                </div>
                <div className="hidden">
                    <input 
                        type="text" 
                        placeholder="Created At"
                        className="task-input"
                        value={formHandler.created_at}
                    />
                </div>
                <div className="hidden">
                    <input 
                        type="text" 
                        placeholder="Last Updated At"
                        className="task-input"
                        value={formHandler.last_updated_at}
                    />
                </div>
                <div className="incline-content">
                    <button className="button" onClick={() => HandleReset()}>Reset</button>
                    <button className="button" type="submit">{!editItem.status? formHandler.parent_category_id === -1 ?"Add Category" : `Add Sub Category` : "Update Item"}</button>
                </div>
            </form>
        </div>
    )
}

export default Form
