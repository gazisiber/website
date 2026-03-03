import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Soon from './components/Soon';
import SoonV3 from './components/SoonV3';

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Soon />} />
                    <Route path="/v3" element={<SoonV3 />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
