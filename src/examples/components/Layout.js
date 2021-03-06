import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const Layout = () => (
  <div className='bg-gray-200 min-h-screen w-screen'>
    <main>
      <div className='h-48 bg-brand'>
        <div className='container mx-auto max-w-4xl pt-12'>
          <div className='text-lg mb-2 text-white uppercase'>Form Examples</div>
          <ul className='flex '>
            <li className='mr-3'>
              <Link
                className='inline-block border border-white rounded py-1 px-3 text-white hover:text-white'
                to='/'
              >
                Managed Fetch Form
              </Link>
            </li>
            <li className='mr-3'>
              <Link
                className='inline-block border border-white rounded py-1 px-3 text-white hover:text-white'
                to='/custom-form'
              >
                Custom Form
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='container mx-auto max-w-4xl -m-12 pb-12'>
        <div className='rounded-md bg-white border-gray-300 border p-6 drop-shadow-md'>
          <Outlet />
        </div>
      </div>
    </main>
  </div>
);
export default Layout;
