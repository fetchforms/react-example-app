import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagedForm from './examples/fetchForm/ManagedForm';
import CustomForm from './examples/customForm/Parent';
import Layout from './examples/components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ManagedForm />} />
          <Route path='custom-form' element={<CustomForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
