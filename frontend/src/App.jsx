import PredictionForm from './components/PredictionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
    return (
        <div className="app-container">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h1 className="text-center mb-5">Disease Prediction System</h1>
                        <PredictionForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;