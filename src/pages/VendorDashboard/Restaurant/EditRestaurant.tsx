import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Button, Col, Divider, Form, Row, Switch, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ResForm from "../../../component/Form/FormProvider";
import ResDatePicker from "../../../component/Form/ResDatePicker";
import ResInput from "../../../component/Form/ResInput";
import ResSelect from "../../../component/Form/ResSelect";
import ResTextArea from "../../../component/Form/ResTextarea";
import ResTimePicker from "../../../component/Form/ResTimepicker";
import MultiUpload from "../../../component/MultiUpload/MultiUpload";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import {
  useDeleteFileMutation,
  useEditRestaurantMutation,
  useGetSingleRestaurantQuery,
} from "../../../redux/features/restaurant/restaurantApi";
import { restaurantSchema } from "../../../schema/restaurant.schema";

dayjs.extend(customParseFormat);

const containerStyle = {
  width: "100%",
  height: "300px",
};

// Default center if no valid location is available (New York City as fallback)


const EditRestaurant = () => {
  // category

  const {
    data: CategoryData,
    isLoading,
    isFetching,
  } = useGetAllCategoryQuery({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewStatus, setReviewStatus] = useState(true);
  const [editRestaurant] = useEditRestaurantMutation();
  const [deleteImages] = useDeleteFileMutation();
  const { data: singleRestaurantData } = useGetSingleRestaurantQuery(id!);
  const autocompleteRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [mapVisible, setMapVisible] = useState(false); // Controls when to show the map
const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
 const images = singleRestaurantData?.data?.images || [];

 useEffect(() => {
  const coordinates = singleRestaurantData?.data?.location?.coordinates;
  if (coordinates && coordinates.length === 2) {
    setSelectedPosition({
      lat: Number(coordinates[1]),
      lng: Number(coordinates[0]),
    });
  }
  const defaultFileList = images.map((img: any, index: number) => ({
    uid: img?._id || `-${index + 1}`,        // unique id (can use _id)
    name: `image-${index + 1}.jpg`,         // fallback name
    status: 'done',
    url: img?.url,                           // actual URL for preview
  }));

  setFileList(defaultFileList);

}, [singleRestaurantData]);



  const libraries: any = ["places"];
  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAu6RiRrpTx0SY5nnFxml5UbOpuHiGNHKI",
    libraries: libraries, // Use the constant here
  });

  // Manually load map when button is clicked
const loadMap = () => {
  if (singleRestaurantData?.data?.location?.coordinates) {
    const [lng, lat] = singleRestaurantData.data.location.coordinates;
    setSelectedPosition({
      lat: Number(lat),
      lng: Number(lng),
    });
  }
  setMapVisible(true);
};

  // Handle map clicks to update selected location
  const onMapClick = useCallback(
    (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedPosition({ lat, lng });

      if (marker) {
        marker.setPosition({ lat, lng });
      } else {
        const newMarker = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
        });
        setMarker(newMarker);
      }
    },
    [marker, map]
  );

  const onLoad = useCallback((map: any) => {
    setMap(map);
    const initialMarker = new window.google.maps.Marker({
      position: selectedPosition,
      map: map,
    });
    setMarker(initialMarker);

    setTimeout(() => {
      window.google.maps.event.trigger(map, "resize");
    }, 500);
  }, []);

  const onUnmount = useCallback(() => {
    if (marker) marker.setMap(null);
    setMap(null);
    setMarker(null);
  }, [marker]);

  const onChange = (value: boolean) => {
    setReviewStatus(value);
  };

  const onSubmit = async (data: any) => {
    const location = {
      coordinates: [selectedPosition!.lng, selectedPosition!.lat],
      type: "Point",
    };

    const formData = new FormData();
    fileList.forEach((file: any) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    formData.append(
      "data",
      JSON.stringify({ ...data, location, reviewStatus })
    );
    const toastId = toast.loading("Editing...");
    try {
      await editRestaurant({ id, data: formData }).unwrap();
      toast.success("Restaurant edited successfully", { id: toastId });
      navigate("/vendor/restaurant");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  const options = CategoryData?.data?.map((data: any) => {
    return {
      label: data?.name,
      value: data?._id,
    };
  });

  // delete image


 const handleImageDelete = (deleteImages: any) => {
  return async (file: any): Promise<boolean> => {
    const toastId = toast.loading("Deleting image...");
    const body  = {
      imageId:file.uid,
      restaurantId:singleRestaurantData?.data?._id
    }
    try {
      await deleteImages(body).unwrap(); // uid = image._id
      toast.success("Image deleted successfully", { id: toastId });
      return true;
    } catch (err) {
      toast.error("Failed to delete image", { id: toastId });
      return false;
    }
  };
};

  return (
    <div>
      <ResForm
        onSubmit={onSubmit}
        defaultValues={singleRestaurantData?.data}
        resolver={zodResolver(restaurantSchema.EditRestaurant)}
      >
        <Row gutter={[14, 0]}>
          <Col span={12}>
            <Form.Item>
              <MultiUpload
              removeFile={handleImageDelete(deleteImages)}
                fileList={fileList as RcFile[]}
                setFileList={setFileList}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            {!mapVisible ? (
              <div
                className="flex items-center justify-center w-full border-2 border-primary rounded-md cursor-pointer"
                style={{ height: "300px" }} // Same height as the map
                onClick={loadMap}
              >
                <p className="text-gray-500 text-lg font-500 text-24 ">
                  🗺️ Click to Load Map
                </p>
              </div>
            ) : (
              isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={selectedPosition || { lat: 23.8103, lng: 90.4125 }}
                  zoom={12}
                  onLoad={(map) => {
                    setMap(map);

                    // Ensure the marker is set correctly when map loads
                    const initialMarker = new window.google.maps.Marker({
                      position: selectedPosition,
                      map: map,
                    });

                    setMarker(initialMarker);

                    // Ensure map resizes properly
                    setTimeout(() => {
                      window.google.maps.event.trigger(map, "resize");
                    }, 500);
                  }}
                  onUnmount={() => {
                    if (marker) marker.setMap(null);
                    setMap(null);
                    setMarker(null);
                  }}
                  onClick={(event) => {
                    // @ts-ignore
                    const lat = event?.latLng.lat();
                    // @ts-ignore
                    const lng = event?.latLng.lng();
                    setSelectedPosition({ lat, lng });

                    if (marker) {
                      marker.setPosition({ lat, lng });
                    } else {
                      const newMarker = new window.google.maps.Marker({
                        position: { lat, lng },
                        map: map,
                      });
                      setMarker(newMarker);
                    }
                  }}
                >
                  {selectedPosition && <Marker position={selectedPosition} />}
                </GoogleMap>
              )
            )}
          </Col>

   
          <Col span={8}>
            <ResInput
              type="text"
              label="Enter Restaurant name"
              name="name"
              placeholder="Type name here"
            />
          </Col>
          <Col span={8}>
            <ResInput
              type="text"
              label="Enter Restaurant address"
              name="address"
              placeholder="Type address"
            />
          </Col>
          <Col span={8}>
            <ResSelect
              options={options}
              label="Select Category"
              name="category"
              placeholder="Select Category"
            />
          </Col>
          <Col span={24}>
            <ResTextArea
              label="Description"
              name="description"
              placeholder="Type description"
            />
          </Col>
           <Col span={6}>
            <ResDatePicker
              showTime={true}
              size="large"
              label="Enter Close From"
              name="close.from"
              placeholder="select date and time"
            />
          </Col>
          <Col span={6}>
            <ResDatePicker
              showTime={true}
              size="large"
              label="Enter Close To"
              name="close.to"
              placeholder="select date and time"
            />
          </Col>
          <Col span={6}>
            <ResInput
              size="large"
              label="Enter helpineNumber (the number should have whatsapp)"
              type="text"
              name="helpLineNumber1"
              placeholder="type number"
            />
          </Col>
     <Col span={6}>
            <ResInput
              size="large"
              label="Enter Another Number"
              type="text"
              name="helpLineNumber2"
              placeholder="type number"
            />
          </Col>
          <Col span={24} className="flex gap-x-4">
            <Form.Item name="review-status">
              <div className="flex gap-x-2 items-center">
                <p>Review Status</p>
                <Switch defaultChecked onChange={onChange} />
              </div>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Divider className="bg-deepGray" />
            <Row gutter={16}>
              <Col span={12}>
                <ResTimePicker
                  label="Saturday Open Time"
                  name="saturday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Saturday Close Time"
                  name="saturday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Sunday Open Time"
                  name="sunday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Sunday Close Time"
                  name="sunday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Monday Open Time"
                  name="monday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Monday Close Time"
                  name="monday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Friday Open Time"
                  name="friday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Friday Close Time"
                  name="friday.closingTime"
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Divider className="bg-deepGray" />
            <Row gutter={16}>
              <Col span={12}>
                <ResTimePicker
                  label="Tuesday Open Time"
                  name="tuesday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Tuesday Close Time"
                  name="tuesday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="WednesDay Open Time"
                  name="wednesday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="WednesDay Close Time"
                  name="wednesday.closingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Thursday Open Time"
                  name="thursday.openingTime"
                />
              </Col>
              <Col span={12}>
                <ResTimePicker
                  label="Thursday Close Time"
                  name="thursday.closingTime"
                />
              </Col>
            </Row>

            <div className="flex justify-end mt-6 ">
              <Button
                htmlType="submit"
                className=" bg-primary text-white font-600 w-[150px] text-18 h-[40px]"
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </ResForm>
    </div>
  );
};

export default EditRestaurant;
