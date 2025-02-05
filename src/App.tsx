import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import JobList from "./components/displayJobs";
import HeroSection from "./components/heroSection";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <HeroSection />
        <SearchBar />
        <JobList />
      </Router>
    </Provider>
  );
}
