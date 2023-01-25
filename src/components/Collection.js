
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory
} from "react-router-dom";
import Search from "./Search";
import Brand from "./Brand";
import LazyLoad from "react-lazyload"
import Download from "./Download";
import MainContext from "../MainContext";
import { useContext, useEffect } from "react";
import {GrLinkPrevious} from "react-icons/gr"
import Loader from "./Loader";



function Collection() {


    const { slugs } = useParams();
    
    const history= useHistory();

    const {brands,selectedBrands,setSelectedBrands} = useContext(MainContext)
   
    useEffect(() => {
        setSelectedBrands(slugs.split(','));
    }, [])
    
    const clearSelectedBrands = () => {
        setSelectedBrands([]);
        history.push('/')
    }
    return (


        <main className="content">
            <header className="header">
       

            <Link to="/" onClick={clearSelectedBrands}>
                    <a className="back-btn">
                    <GrLinkPrevious/> All Brands
                     </a>
            </Link>

                {selectedBrands.length !== 0 && <Download />}

            </header>


            <section className="brands">
                {selectedBrands.map(slug => {
                    let brand=brands.find(brand => brand.slug === slug)
                    return(
                        <LazyLoad key={brand.slug} once={true} overflow={true} placeholder={<Loader/>}>
                            <Brand brand={brand} />
                        </LazyLoad>
                    )
                })}
            </section>

        </main>
    );
}
export default Collection;