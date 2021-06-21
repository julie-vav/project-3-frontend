import './App.css';
import ServiceRequest from "./components/ServiceRequest/ServiceRequest";
import Form from "./components/Form/Form";

export default function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>MY-SDK</h1>
      </header>
      <ServiceRequest />
      <Form />

    </div>
  );
}

