import React,{useEffect, useState} from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:8000'
})

const CategoryDetails = ({node}) => {
    const [parent, setParent] = useState()
    const [root, setRoot] = useState()
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        console.log("Category Details : " + node)
        if(node){    
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
                    })
                })
            })
        }
    }, [node])

    return (
        <div className={node.id? "category-wrapper" : "hidden"} key={node ? node.id : ""}>
            <h1>{node ? node.title : ""}</h1>
            <p><span>Description : </span>{node ? node.description : ""}</p>
            <p><span>ID : </span>{node? node.id : ""}</p>
            <p><span>Sub Categories :</span></p>
            <ul className="sub-category-list">
                {
                    subCategories?.map((subcategory) => 
                        <li>{subcategory.title}</li>
                    )
                }
            </ul>
            <p><span>Parent Node : </span>{parent}</p>
            <p><span>Root Node : </span>{root}</p>
        </div>
    )
}

export default CategoryDetails
