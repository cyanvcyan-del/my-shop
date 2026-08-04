import Grouping from "./components/Grouping";
import Searchbar from "./components/SearchBar"
import Hero from "./features/Hero1";

export default function Home() {
  return (
    <div  className="">
      <Searchbar/>
      <Hero/>
      <Grouping/>
    </div>
  );
}
