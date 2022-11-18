import Popup from '../Popup/Popup';
import AddForm from "../AddForm/AddForm";

function App() {
  return (
    <div className="app">
      <h1 className="app__title">ToDo List</h1>
      <button className="app__new-task">
        Новая задача
        <svg className="app__new-task-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="Layer_1" data-name="Layer 1">
            <path d="m10 22h-8v-8h8zm.5-9h-9a.5.5 0 0 0 -.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0 -.5-.5z"></path>
            <path d="m10 10h-8v-8h8zm.5-9h-9a.5.5 0 0 0 -.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0 -.5-.5z"></path>
            <path d="m22 10h-8v-8h8zm.5-9h-9a.5.5 0 0 0 -.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0 -.5-.5z"></path>
            <path d="m22.5 17.5h-4v-4a.5.5 0 0 0 -1 0v4h-4a.5.5 0 0 0 0 1h4v4a.5.5 0 0 0 1 0v-4h4a.5.5 0 0 0 0-1z"></path>
          </g>
        </svg>
      </button>
      {/* <AddForm /> */}
      <Popup>
        <AddForm />
      </Popup>
    </div>
  );
}

export default App;
