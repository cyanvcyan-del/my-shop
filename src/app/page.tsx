import BestSellers from "./components/Bestsellers";
import Grouping from "./components/Grouping";
import NewProducts from "./components/NewProducts";
import Searchbar from "./components/SearchBar"
import Hero from "./features/Hero1";

export default function Home() {
  return (
    <div  className="">
      <Searchbar/>
      <Hero/>
      <Grouping/>
      <BestSellers/>
      <NewProducts/>
    </div>
  );
}
