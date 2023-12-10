import { BookCreateContainer } from '../../Components/Organism/Books';
import Dashboard from '../../Layouts/Dashboard';
import PrivateProvider from '../Providers/PrivateProvider';

function Create() {
  return (
    <PrivateProvider>
      <Dashboard>
        <BookCreateContainer />
      </Dashboard>
    </PrivateProvider>
  );
}

export default Create;