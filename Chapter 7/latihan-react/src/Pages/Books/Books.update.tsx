import { BookUpdateContainer } from '../../Components/Organism/Books';
import Dashboard from '../../Layouts/Dashboard';
import PrivateProvider from '../Providers/PrivateProvider';

function Update() {
    return (
        <PrivateProvider>
            <Dashboard>
                <BookUpdateContainer />
            </Dashboard>
        </PrivateProvider>
    );
}

export default Update;