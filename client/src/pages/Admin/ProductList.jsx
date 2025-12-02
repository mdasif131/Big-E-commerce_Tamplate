import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../redux/api/productApiSlice.js';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice.js';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu.jsx';
const ProductList = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const uploadfileHandler = async e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('image', image);
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('category', category);
      productData.append('quantity', quantity);
      productData.append('brand', brand);
      productData.append('countInStock', stock);

      const { data } = await createProduct(productData);
      if (data.error) {
        toast.error('Product create failed. Try Again');
      } else {
        toast.success(`${data.name} is created`);
      }
    } catch (error) {
      console.error(error)
      toast.error(' Product create failed. Try Again');
      navigate('/');
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* Admin Menu  */}
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h1 className="h-12">Create Product</h1>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="Product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 hover:border-green-300">
              {image ? image.name : 'Upload Image'}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadfileHandler}
                className={!image ? 'hidden' : 'text-white'}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex  flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] input-product-thems"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] input-product-thems"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="three ">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] input-product-thems"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>
              <div className="three ml-10">
                <label htmlFor="name block">brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] input-product-thems"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 input-product-thems w-[95%]"
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] input-product-thems"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Category</label>
                <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] input-product-thems"
                  onChange={e => setCategory(e.target.value)}
                >
                  {categories?.data?.map(data => (
                    <option key={data._id} value={data._id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
