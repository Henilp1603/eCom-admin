import {
  Card,
  Divider,
  Text,
  TextInput,
  SearchSelect,
  SearchSelectItem,
  Button,
} from "@tremor/react";
import axios from "axios";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useProductContext} from "../Context/ProductContext";
import Loading from "../components/Loading";
import {toast} from "react-toastify";

export default function UpdateProduct() {
  let {state} = useLocation();

  const [data, setData] = useState({
    title: state.title,
    description: state.description,
    MRP: state.MRP,
    discountedPrice: state.discountedPrice,
    category: state.category,
    colors: state.colorsAndImg.map((item) => item.color),
    images: state.colorsAndImg.map((item) => item.image),
    newImg: [],
  });

  const [image, setImage] = useState("");

  const [curCategory, setCurCategory] = useState("");
  const [curColor, setcurColor] = useState("");

  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const [uploadedImg, setUploadedImg] = useState(null);

  const {getProducts} = useProductContext();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpdateProduct = async () => {
    setIsLoading(true);
    const API = `${
      import.meta.env.VITE_SERVER_API
    }/api/product/update-product/${state._id}`;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("MRP", data.MRP);
    data.images.map((i) => formData.append("image", i));
    data.colors.map((c) => formData.append("colors", c));
    data.newImg.map((n) => formData.append("images", n));

    formData.append("discountedPrice", JSON.stringify(data.discountedPrice));

    data.category.map((c) => formData.append("category", c));

    const res = await axios.put(API, formData);

    if (res.data) {
      setIsLoading(false);
      toast.success("Product Updated.");
      navigate("/products");
      getProducts(`${import.meta.env.VITE_SERVER_API}/api/product/all-product`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-8 py-7 pl-72 w-[100vw]">
          <div>
            <h1 className="text-2xl font-semibold">Add a new products</h1>
            <h6 className="text-sm font-normal text-gray-600">
              This is where you can add new products to your inventory
            </h6>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center w-full gap-4 mt-10">
              <div className="flex items-center justify-center w-full">
                <Card className="w-max">
                  <div className="relative object-cover w-32 h-32">
                    {uploadedImg ? (
                      <img src={uploadedImg} />
                    ) : (
                      <img src="./empty-img.jpg" />
                    )}
                  </div>
                </Card>
              </div>
              <div className="w-full mt-4">
                <Text className="text-xl font-semibold">
                  Add product details
                </Text>
              </div>
              <Divider className="mt-0" />
              <div className="flex flex-col gap-2 w-96">
                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">Product name</Text>
                  <TextInput
                    placeholder="Enter Product Name"
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          title: e.target.value,
                        };
                      })
                    }
                    value={data.title}
                  ></TextInput>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">
                    Product description
                  </Text>
                  <TextInput
                    placeholder="Enter Product Description"
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          description: e.target.value,
                        };
                      })
                    }
                    value={data.description}
                  ></TextInput>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">MRP</Text>
                  <TextInput
                    placeholder="Enter Selling Price"
                    type="number"
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          MRP: e.target.value,
                        };
                      })
                    }
                    value={data.MRP}
                  ></TextInput>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">
                    Colors available (If any)
                  </Text>
                  <TextInput
                    placeholder="Enter Colors"
                    name="color"
                    value={curColor}
                    onChange={(e) => setcurColor(e.target.value)}
                  ></TextInput>
                  <TextInput
                    placeholder="Enter Price"
                    className="flex-1"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  ></TextInput>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setData((prev) => {
                        return {
                          ...prev,
                          colors: [...prev.colors, curColor],
                          newImg: [...prev.newImg, image],
                        };
                      });
                      toast.success("Color and Image Added.");
                      setcurColor("");
                      setImage("");
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">
                    Select product category
                  </Text>
                  <div className="w-full flex gap-2">
                    <SearchSelect
                      value={curCategory}
                      onValueChange={(value) => setCurCategory(value)}
                    >
                      <SearchSelectItem value="Resin">Resin</SearchSelectItem>
                      <SearchSelectItem value="Art">Art</SearchSelectItem>
                      <SearchSelectItem value="Epoxy">Epoxy</SearchSelectItem>
                      <SearchSelectItem value="another">
                        Another Category
                      </SearchSelectItem>
                    </SearchSelect>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setData((prev) => {
                          return {
                            ...prev,
                            category: [...prev.category, curCategory],
                          };
                        });
                        toast.success("Category Added.");
                        setCurCategory("");
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 w-full">
                  <Text className="text-lg font-normal flex-2">
                    Product sizes (if any)
                  </Text>

                  <TextInput
                    placeholder="Enter Sizes"
                    className="flex-1"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  ></TextInput>
                  <TextInput
                    placeholder="Enter Price"
                    className="flex-1"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></TextInput>

                  <Button
                    className="flex-1"
                    onClick={() => {
                      setData((prev) => {
                        return {
                          ...prev,
                          discountedPrice: [
                            ...prev.discountedPrice,
                            {
                              size: size,
                              price: price,
                            },
                          ],
                        };
                      });
                      setPrice("");
                      setSize("");
                      toast.success("Size and Price Added.");
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button onClick={() => handleUpdateProduct()}>Save</Button>
                  <Button variant="secondary">Discard</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
