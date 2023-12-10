import { CarUpdateContainer } from '../../Components/Organism/Cars';
import Dashboard from '../../Layouts/Dashboard';
import PrivateProvider from '../Providers/PrivateProvider';

function Update() {
    return (
        <PrivateProvider>
            <Dashboard>
                <CarUpdateContainer />
            </Dashboard>
        </PrivateProvider>
    );
}

export default Update;