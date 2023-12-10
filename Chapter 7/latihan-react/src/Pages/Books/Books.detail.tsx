import PrivateProvider from '../Providers/PrivateProvider';
import Dashboard from '../../Layouts/Dashboard';
import { BookDetailContainer } from '../../Components/Organism/Books';

function Books() {
    return (
        <PrivateProvider>
            <Dashboard>
                <BookDetailContainer />
            </Dashboard>
        </PrivateProvider>
    );
}

export default Books;
