import PrivateProvider from '../Providers/PrivateProvider';
import Dashboard from '../../Layouts/Dashboard';
import { BookListContainer } from '../../Components/Organism/Books';

function Books() {
    return (
        <PrivateProvider>
            <Dashboard>
                <BookListContainer />
            </Dashboard>
        </PrivateProvider>
    );
}

export default Books;
