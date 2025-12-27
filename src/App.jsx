import { ThemeProvider } from './context/ThemeContext';
import Soon from './components/Soon';

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen">
                <Soon />
            </div>
        </ThemeProvider>
    );
}

export default App;
