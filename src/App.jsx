import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from './source/hooks/useActions';

function App() {
  const [count, setCount] = useState(0);
  const data = useSelector((state) => state.contacts.data);
  const {addContact} = useActions();

  console.log(data)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={() => addContact({ name: 'Alex ' + count })}>
        Add Data
      </button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h1 className="text-3xl font-bold underline">
        Hello world! <span className="material-icons">credit_card</span>
      </h1>
    </>
  );
}

export default App;
