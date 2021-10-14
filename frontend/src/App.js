import './App.css';
import NodeList from './components/NodeList.jsx'
import Form from './components/Form.jsx'
import axios from 'axios'
import { useState, useEffect} from 'react';
import Header from './components/Header.jsx';
import CategoryDetails from './components/CategoryDetails.jsx';
import ButtonList from './components/ButtonList.jsx';

const api = axios.create({
    baseURL : 'http://localhost:8000/categories'
  })

function App() {
  console.log("App Eneterance ")
  const [nodeList, setNodeList] = useState([])
  const [node, setNode] = useState({})
  const [updatedRootNodes, setUpdatedRootNodes] = useState(false)
  const [formHandler, setFormHandler] = useState({
    id : 0,
    title : "",
    description : "",
    parent_category_id : -1,
    created_at : "",
    last_updated_at : ""
  })
  const [editItem, setEditItem] = useState({status : false, node : null})

  useEffect(() => {
    console.log("App useMemo")
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
  },[updatedRootNodes])

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
        <div className="body-wrapper col-8">
          <ButtonList
            setNodeList={setNodeList}
          />
          <div className="node-list-wrapper ">
            <NodeList
              setFormHandler={setFormHandler}
              nodeList = {nodeList}
              setEditItem={setEditItem}
              setUpdatedRootNodes={setUpdatedRootNodes}
              setNode={setNode}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
