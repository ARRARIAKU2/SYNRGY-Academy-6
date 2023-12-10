import { CarCreateContainer } from '../../Components/Organism/Cars';
import Dashboard from '../../Layouts/Dashboard';
import PrivateProvider from '../Providers/PrivateProvider';

function Create() {
  return (
    <PrivateProvider>
      <Dashboard>
        <CarCreateContainer />
      </Dashboard>
    </PrivateProvider>
  );
}

export default Create;