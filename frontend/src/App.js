import './App.css';
import NodeList from './components/NodeList.jsx'
import Form from './components/Form.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import CategoryDetails from './components/CategoryDetails.jsx';

const api = axios.create({
    baseURL : 'http://localhost:8000/categories'
  })

// const data1 = [ 
//   [{"id":26121,"title":"Shoes","description":"Puma","parent_category_id":-1},
//   {"id":74738,"title":"Belt","description":"Armani","parent_category_id":-1},
//   {"id":28879,"title":"Clothes","description":"All Sorts of","parent_category_id":-1}],
//   [{"id":158318,"title":"Boots","description":"Black","parent_category_id":26121},
//   {"id":763080,"title":"Crocks","description":"Colourful","parent_category_id":26121}],
//   [{"id":446189,"title":"Muffler","description":"Winter","parent_category_id":28879},
//   {"id":372480,"title":"Socks","description":"Winter","parent_category_id":28879},
//   {"id":932473,"title":"Jackets","description":"Winter","parent_category_id":28879},
//   {"id":866086,"title":"Sweatshirts","description":"Winter","parent_category_id":28879},
//   {"id":586052,"title":"Gloves","description":"Winter","parent_category_id":28879},
//   {"id":958715,"title":"Skirts","description":"Summer","parent_category_id":28879},
//   {"id":270283,"title":"Shirts","description":"Summer","parent_category_id":28879}],
//   [{"id":636277,"title":"Full Sleeves","description":"Summer","parent_category_id":270283},
//   {"id":284988,"title":"Half Sleeves","description":"Summer","parent_category_id":270283}]
// ]
// const data2 = [
//   [
//     {
//       id : "1",
//       title : "Apparel",
//       description : "NA",
//       parent_category_id : "-1"
//     }
//   ],
//   [
//     {
//       id : "2",
//       title : "Women",
//       description : "NA",
//       parent_category_id : "1"
//     },
//     {
//       id : "3",
//       title : "Men",
//       description : "NA",
//       parent_category_id : "1"
//     }
//   ],
//   [
//     {
//       id : "4",
//       title : "Dresses",
//       description : "NA",
//       parent_category_id : "2"
//     },
//     {
//       id : "5",
//       title : "Sweaters",
//       description : "NA",
//       parent_category_id : "2"
//     },
//     {
//       id : "6",
//       title : "Handbags",
//       description : "NA",
//       parent_category_id : "2"
//     },
//     {
//       id : "7",
//       title : "Shirts",
//       description : "NA",
//       parent_category_id : "3"
//     },
//     {
//       id : "8",
//       title : "Pants",
//       description : "NA",
//       parent_category_id : "3"
//     },
//     {
//       id : "9",
//       title : "Suits",
//       description : "NA",
//       parent_category_id : "3"
//     }
//   ]
// ]

function App() {
  const [nodeList, setNodeList] = useState([])
  const [node, setNode] = useState({})
  const [updatedRootNodes, setUpdatedRootNodes] = useState(false)
  const [formHandler, setFormHandler] = useState({
    id : 0,
    title : "",
    description : "",
    parent_category_id : -1
  })
  const [editItem, setEditItem] = useState({status : false, node : null})

  useEffect(() => {
    try{
      api.get('/',
      {
        headers: {'Access-Control-Allow-Origin': '*'},
        proxy: {
          host: 'localhost',
          port: 800
        }
      })
      .then((response) => {
        if(response.status >= 200 && response.status < 300){
          setNodeList(response.data)
        }
        else{
          console.log("Error Occurred while fetching the data : " + response.status)
        }
      })
    }
    catch(exeception){
        console.log("Exception occurred when tried to hit the get all api : " + exeception)
    }
  },[updatedRootNodes, nodeList])

  return (
    <div className="app">
      <div className="app-wrapper">
        <div className="sidenav col-4">
          <Header/>
          <Form
            formHandler={formHandler}
            setFormHandler={setFormHandler}
            editItem={editItem}
            setEditItem={setEditItem}
            setUpdatedRootNodes={setUpdatedRootNodes}
            nodeList={nodeList}
          />
          <CategoryDetails node={node}/>
        </div>
        <div className="node-list-wrapper col-8">
          <NodeList
            setFormHandler={setFormHandler}
            nodeList = {nodeList}
            setEditItem={setEditItem}
            setUpdatedRootNodes={setUpdatedRootNodes}
            setNode={setNode}/>
        </div>
      </div>
    </div>
  );
}

export default App;
