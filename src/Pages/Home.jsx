
import Hero from "../components/Hero"
import Category from "../components/Category";
import Products from "./Products";

const Home = () => {
  return (
    <div className="container mx-auto pb-24 py-4 px-4 lg:px-16">
      <Hero />

      <div className="container mx-auto px-6 md:px-10 pt-8">
        <Category />
      </div>

      <div className="container mx-auto px-6 md:px-10 pt-8">
        <Products showTShirtSelector={false} />
      </div>
    </div>
  );
};

export default Home;
