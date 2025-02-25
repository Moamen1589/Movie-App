import Carousel from "./Carousel";
import Popular from "./Popular";
import TopRated from "./TopRated";

export default function Home() {
  return (
   <div className="h-lvw">
     <Carousel/>
     <Popular/>
     <TopRated/>
   </div>
  )
}
