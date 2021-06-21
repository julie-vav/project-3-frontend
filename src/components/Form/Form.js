import './Form.css'
import { useState, useEffect } from "react";

function Form(props) {
    const [state, setState] = useState({
        requests: [{ name: " ", request: "", description: "", priority: ""}],
        newRequest: {
          name: "",
          request: "VPN",
          description: "System not connecting",
          priority: "Low"
        },
      });
      
useEffect(function() {
  async function getAppData() {

    const requests = await fetch('http://localhost:3001/api/requests')
    .then(res => res.json());

    setState(prevState => ({
      ...prevState,
      requests
    }));
  }

  getAppData();

}, []);

async function handleSubmit(e) {
    e.preventDefault();
    try {
      const request = await fetch('http://localhost:3001/api/requests', {
        method: 'POST', 
        headers: {
           'content-type': 'Application/json'
         },
        body: JSON.stringify(state.newRequest) 
       }).then(res => res.json())
       
         setState({
          requests: [...state.requests, request],
          newRequest: {
            name: "",
            request: "VPN",
            description: "",
            priority: ""
          }
        });
    } catch (error) {
      console.log(error);
    }
  
      
    const request = await fetch('http://localhost:3001/api/requests', {
      method: 'POST', 
      headers: {
         'content-type': 'Application/json'
       },
      body: JSON.stringify(state.newRequest) 
     }).then(res => res.json())
     
       setState({
        requests: [...state.requests, request],
        newRequest: {
          name: "",
           request: "VPN",
           description: "",
           priority: "Low"
        }
      });
    }
        

    function handleChange(e) {
        setState(prevState => ({
                requests: prevState.requests, 
                newRequest: {
                  ...prevState.newRequest,
                  [e.target.name]: e.target.value
                }
        }));
    }

  return (
    <div className="Form">
      {state.requests.map((s, i) => (
        <article key={i}>
          <div>Employee ID: {s.name}</div> <div>Request: {s.request}</div> <div>Description: {s.description}</div> <div>Priority: {s.priority}</div> 
          </article>
      ))}
      <form onSubmit={handleSubmit}>
      <section>
         <label>
           <span>Employee ID</span>
           <input name="name" value={state.newRequest.name}  onChange={handleChange} placeholder="Username"/>
        </label>
        <label>
           <span>Request Type</span>
           <select name="request" value={state.newRequest.request}onChange={handleChange} >
               <option value="VPN">VPN</option>
               <option value="Mitel SoftPhone">Mitel SoftPhone</option>
               <option value="Login Access">Login Access</option>
               <option value="Payroll">Payroll</option>
               <option value="Other">Other</option>
           </select>
        </label>
        <label>
           <span>Description</span>
           <input name="description" value={state.newRequest.description} onChange={handleChange} placeholder="System not connecting"/>
        </label>
        <label>
           <span>Priority</span>
           <select name="priority" value={state.newRequest.priority}onChange={handleChange} placeholder="Low">
               <option value="Low">Low</option>
               <option value="Medium">Medium</option>
               <option value="Urgent">Urgent</option>
           </select>
        </label>
       </section>
       <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;