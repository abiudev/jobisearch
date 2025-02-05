import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import JobList from "./components/displayJobs";
import HeroSection from "./components/heroSection";

export default function App() {
  return (
    <Provider store={store}>
      <div className="bg-teal-300 min-h-screen">
        <Navbar />
        <HeroSection />
        <SearchBar />
        <JobList />
      </div>
    </Provider>
  );
}
