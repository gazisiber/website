import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ComingSoon from './components/ComingSoon'
import MainSite from './components/MainSite'

function App() {
    return (
        <Router>
            <Routes>
                {/* Coming Soon - Ana sayfa */}
                <Route path="/" element={<ComingSoon />} />

                {/* Secret Page - Gerçek site */}
                <Route path="/secret-page82" element={<MainSite />} />
            </Routes>
        </Router>
    )
}

export default App
