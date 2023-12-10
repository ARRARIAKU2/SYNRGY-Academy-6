import PrivateProvider from '../Providers/PrivateProvider';
import Dashboard from '../../Layouts/Dashboard';
import { CarListContainer } from '../../Components/Organism/Cars';

function List() {
    return (
        <PrivateProvider>
            <Dashboard>
                <CarListContainer />
            </Dashboard>
        </PrivateProvider>
    );
}

export default List;
