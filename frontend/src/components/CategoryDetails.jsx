import React,{useEffect, useState} from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:8000/categories'
})

const CategoryDetails = ({node}) => {
    console.log("Categiry Details Eneterance")
    const [parent, setParent] = useState()
    const [root, setRoot] = useState()
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        if(node.id){    
            console.log("Category Details : ")
            console.log(node)
            api.get(`/root/${node.id}`,
            {
                headers: {'Access-Control-Allow-Origin': '*'},
                proxy: {
                host: 'localhost',
                port: 800
                }
            }).then((response) => {
                if(response.status >= 200 && response.status < 300){
                    if(response.data){
                        setRoot(response.data.title)
                    }
                    else{
                        setRoot("Root")
                    }
                }
                api.get(`/parent/${node.id}`,
                {
                    headers: {'Access-Control-Allow-Origin': '*'},
                    proxy: {
                    host: 'localhost',
                    port: 800
                    }
                }).then((response) => {
                    if(response.status >= 200 && response.status < 300){
                        if(response.data){
                            setParent(response.data?.title)
                        }
                    }
                    else{
                        setParent("Root")
                    }
                    api.get(`/subcategories/${node.id}`,
                    {
                        headers: {'Access-Control-Allow-Origin': '*'},
                        proxy: {
                        host: 'localhost',
                        port: 800
                        }
                    }).then((response) => {
                        if(response.status >= 200 && response.status < 300){
                            setSubCategories(response.data)
                        }
                        else{
                            setSubCategories([])
                        }
                    }).catch((exception) => {
                        console.log("Error Occurred while fetching the subcategories : " + exception)
                    })
                }).catch((exception) => {
                    console.log("Error Occurred while fetching the parent node : " + exception)
                })
            }).catch((exception) => {
                console.log("Error Occurred while fetching the root node : " + exception)
            })
        }
    }, [node])

    const SubCategories = () => {
        return <>
            <p><span>Sub Categories :</span></p>
            <ul className="sub-category-list">
                {
                    subCategories?.map((subcategory) => 
                        <li>{subcategory.title}</li>
                    )
                }
            </ul>
        </>
    }

    const Parent = () => {
        return <p><span>Parent Node : </span>{parent}</p>
    }

    return (
        <div className={node.id? "category-wrapper" : "hidden"} key={node ? node.id : ""}>
            <h1>{node ? node.title : ""}</h1>
            <p><span>Description : </span>{node ? node.description : ""}</p>
            <p><span>ID : </span>{node? node.id : ""}</p>
            {subCategories.length > 0 && SubCategories()}
            {parent !== 'Root' && Parent()}
            <p><span>Root Node : </span>{root}</p>
            <p><span>Created At : </span>{node.created_at ? node.created_at.replace("T", " / ") : ""}</p>
            <p><span>Updated At : </span>{node.last_updated_at ? node.last_updated_at.replace("T", " / ") : ""}</p>
        </div>
    )
}

export default CategoryDetails
