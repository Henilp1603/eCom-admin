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
import {Link, useNavigate} from "react-router-dom";
import {useProductContext} from "../Context/ProductContext";
import Loading from "../components/Loading";
import {toast} from "react-toastify";

export default function AddProduct() {
  const [data, setData] = useState({
    title: "",
    description: "",
    MRP: "",
    discountedPrice: [],
    category: [],
    colors: [],
    images: [],
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

  const handleAddProduct = async () => {
    setIsLoading(true);
    const API = `${import.meta.env.VITE_SERVER_API}/api/product/create-product`;

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("MRP", data.MRP);

      formData.append("colors", JSON.stringify(data.colors));
      formData.append("discountedPrice", JSON.stringify(data.discountedPrice));

      data.images.map((f) => formData.append("images", f));

      data.category.map((c) => formData.append("category", c));

      const res = await axios.post(API, formData);
      if (res.data) {
        setIsLoading(false);
        toast.success("Product Created.");
        navigate("/products");
        getProducts(
          `${import.meta.env.VITE_SERVER_API}/api/product/all-product`
        );
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("error!!");
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
                    
                    //color - image ke liye
                    <p>
                      {data.colors.map((item) => (
                        data.images.map((img)=>(

                          <li>{item} - image <button
                          onClick={() => {
                            let newColors =
                              data.colors.filter(
                                (i) => i != item
                              );
  
                              let newImg =
                              data.images.filter(
                                (i) => i != img
                              );  
                              
                            setData((prev) => {
                              return {
                                ...prev,
                                colors:newColors,
                                images:newImg
                              };
                            });
                            setcurColor("")
                            toast.success("Color deleted.");
                          }}
                        >
                          X
                        </button></li>
                        ))
                      ))}
                      
                      
                    </p>
                    //size and price ke liye
                    <p>
                      {data.discountedPrice.map((item) => (
                        <p>
                          <li>
                            {item.size}-{item.price}{" "}
                            <button
                              onClick={() => {
                                let newDiscountedPrice =
                                  data.discountedPrice.filter(
                                    (i) => i.size != item.size
                                  );
                                setData((prev) => {
                                  return {
                                    ...prev,
                                    discountedPrice:newDiscountedPrice
                                  };
                                });
                                setPrice("");
                                setSize("");
                                toast.success("Size and Price deleted.");
                              }}
                            >
                              delete
                            </button>
                          </li>
                        </p>
                      ))}
                    </p>
                   //category ke liye
                    <p>
                      {data.category.map((item) => (
                        <li>{item}</li>
                      ))}
                    </p>
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
                    autoComplete="off"
                    required
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          title: e.target.value,
                        };
                      })
                    }
                  ></TextInput>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">
                    Product description
                  </Text>
                  <TextInput
                    placeholder="Enter Product Description"
                    autoComplete="off"
                    required
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          description: e.target.value,
                        };
                      })
                    }
                  ></TextInput>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">MRP</Text>
                  <TextInput
                    placeholder="Enter Selling Price"
                    autoComplete="off"
                    required
                    type="number"
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          MRP: e.target.value,
                        };
                      })
                    }
                  ></TextInput>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">
                    Colors available (If any)
                  </Text>
                  <TextInput
                    placeholder="Enter Colors"
                    autoComplete="off"
                    required
                    name="color"
                    onChange={(e) => setcurColor(e.target.value)}
                  ></TextInput>
                  <TextInput
                    placeholder="Enter Price"
                    autoComplete="off"
                    className="flex-1"
                    required
                    type="file"
                    defaultValue={image}
                    onChange={(e) => setImage(e.target.files[0])}
                  ></TextInput>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setData((prev) => {
                        return {
                          ...prev,
                          colors: [...prev.colors, curColor],
                          images: [...prev.images, image],
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
                      required
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
                    required
                    onChange={(e) => setSize(e.target.value)}
                    autoComplete="off"
                    value={size}
                  ></TextInput>
                  <TextInput
                    placeholder="Enter Price"
                    className="flex-1"
                    autoComplete="off"
                    required
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
                  <Button onClick={() => handleAddProduct()}>Save</Button>
                  <Link to="/">
                    {" "}
                    <Button variant="secondary">Discard</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
