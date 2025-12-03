import ProductCarosel from "../pages/Products/ProductCarosel.jsx"
import SmallProduct from "../pages/Products/SmallProduct.jsx"
import { useGetTopProductQuery } from "../redux/api/productApiSlice.js"
import Loader from "./Loader.jsx"
const Header = () => {
  const { data, isLoading, isError } = useGetTopProductQuery() 
 
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <h1>ERROR</h1>
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
        <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarosel />
      </div>
    </>
  )
}

export default Header