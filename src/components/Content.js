import Search from "./Search";
import Brand from "./Brand";
import MainContext from "../MainContext";
import { useContext } from "react";
import Download from "./Download";
import Loader from "./Loader";
import { List, AutoSizer } from "react-virtualized";
import LazyLoad from "react-lazyload";

/*
 * aşağıda header'ım içerisinde selectedBrandslar 0'dan büyük ise Download content'im açılsın dedim  !!!
 * 
 */
function Content() {

    const { brands, selectedBrands } = useContext(MainContext)

    // const rowRenderer = ({ key, index, style }) => {

    //     return (
    //         <Brand style={style} brand={brands[index]} key={key} />
    //     )
    // }

    return (

        <>


            <main className="content">
                <header className="header">
                    <Search />

                    {selectedBrands.length !== 0 && <Download />}

                </header>


                <section className="brands">
                    {brands.map(brand => (
                       <LazyLoad key={brand.slug} once={true} overflow={true} placeholder={<Loader/>}>
                            <Brand brand={brand} />
                       </LazyLoad>

                    ))}
                    {/* <AutoSizer>
                        {({ height, width }) => (
                            <List

                                width={width}
                                height={height}
                                rowCount={brands.length}
                                rowHeight={96}
                                rowRenderer={rowRenderer}
                            />
                        )}
                    </AutoSizer> */}

                </section>

            </main>


        </>

    );
}

export default Content