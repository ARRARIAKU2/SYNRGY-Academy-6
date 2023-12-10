import PrivateProvider from '../Providers/PrivateProvider';
import Dashboard from '../../Layouts/Dashboard';
import { CarDetailContainer } from '../../Components/Organism/Cars';

function Detail() {
    return (
        <PrivateProvider>
            <Dashboard>
                <CarDetailContainer />
            </Dashboard>
        </PrivateProvider>
    );
}

export default Detail;
