/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import ResTextArea from "../../../component/Form/ResTextarea";
import ResTimePicker from "../../../component/Form/ResTimepicker";
import MultiUpload from "../../../component/MultiUpload/MultiUpload";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import {
  useDeleteFileMutation,
  useEditRestaurantMutation,
  useGetSingleRestaurantQuery,
} from "../../../redux/features/restaurant/restaurantApi";
import { restaurantSchema } from "../../../schema/restaurant.schema";
import showImage from "../../../utils/showImage";
dayjs.extend(customParseFormat);

const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewStatus, setReviewStatus] = useState(true);
  const [editRestaurant] = useEditRestaurantMutation();
  const [deletImages] = useDeleteFileMutation();
  const { data: singleRestaurantData, isSuccess } = useGetSingleRestaurantQuery(
    id!
  );
  const autocompleteRef = useRef<any>(null);
  const center: any = {
    lat: Number(singleRestaurantData?.data?.location?.coordinates[1]), // Default latitude for Kuwait
    lng: Number(singleRestaurantData?.data?.location?.coordinates[0]), // Default longitude for Kuwait
  };
  console.log(center);
  const containerStyle = {
    width: "800px",
    height: "300px",
  };
  const [map, setMap] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(center);
  const [marker, setMarker] = useState(null);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (singleRestaurantData?.data?.images) {
      const formattedImages = singleRestaurantData?.data?.images?.map(
        (image: any) => ({
          uid: image?._id,
          name: image?.url,
          status: "done",
          url: showImage(image?.url),
        })
      );

      setFileList(formattedImages);
    }
  }, [singleRestaurantData]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
    libraries: ["places"],
  });
  // Handle place selection
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      // Manually update the input value
      const address = place.formatted_address;
      // You can now update the state/form value using setValue or directly into the input
      autocompleteRef.current.input.value = address;
    }
  };

  useEffect(() => {
    if (autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current.input
      );
      autocomplete.addListener("place_changed", handlePlaceSelect);
    }
  }, []);
  // @ts-ignore
  const onMapClick = useCallback(
    (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedPosition({ lat, lng });

      if (marker) {
        // @ts-ignore
        marker.setPosition({ lat, lng });
      } else {
        const newMarker = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
        });
        // @ts-ignore
        setMarker(newMarker);
      }
    },
    [marker, map]
  );
  // @ts-ignore
  const onLoad = useCallback((map: any) => {
    setMap(map);
    const initialMarker = new window.google.maps.Marker({
      position: center,
      map: map,
    });
    // @ts-ignore
    setMarker(initialMarker);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
    if (marker) {
      // @ts-ignore
      marker.setMap(null);
    }
  }, [marker]);

  const onChange = (value: boolean) => {
    setReviewStatus(value);
  };
  const onSubmit = async (data: any) => {
    const location = {
      // latitude: currentPosition?.lat,
      // longitude: currentPosition?.lng,
      coordinates: [
        parseFloat(selectedPosition?.lng as any),
        parseFloat(selectedPosition?.lat as any),
      ],
      type: "Point",
    };

    console.log(location);
    const formatedData = {
      ...data,
      location,
    };
    const formData = new FormData();
    if (fileList && fileList.length > 0) {
      fileList.forEach((file: any) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });
    }
    formData.append("data", JSON.stringify({ ...formatedData, reviewStatus }));
    const toastId = toast.loading("Editing...");
    try {
      await editRestaurant({ id: id, data: formData }).unwrap();
      toast.success("Restaurant edited successfully", {
        id: toastId,
        duration: 2000,
      });
      //   //console.log(res);
      navigate("/vendor/restaurant");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };

  //   delete an image

  const deleteFile = async (file: any): Promise<boolean> => {
    return new Promise((resolve) => {
      toast("Are You Sure?", {
        description: "This action cannot be undone!",
        action: {
          label: "Delete",

          onClick: async () => {
            const toastId = toast.loading("Deleting...");
            try {
              const res = await deletImages({
                restaurantId: id,
                imageId: file?.uid,
              }).unwrap();
              toast.success("Image deleted successfully", {
                id: toastId,
                duration: 2000,
              });
              resolve(true); // Resolve with true if deletion is successful
            } catch (err) {
              ErrorResponse(err, toastId);
              resolve(false); // Resolve with false if deletion fails
            }
          },
        },
      });
    });
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
                fileList={fileList as RcFile[]}
                setFileList={setFileList}
                removeFile={deleteFile}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedPosition}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={onMapClick}
              >
                <Marker position={selectedPosition} />
              </GoogleMap>
            ) : (
              <>Loading...</>
            )}
          </Col>
          <Col span={12}>
            <ResInput
              size="large"
              label="Enter Restaurant name"
              type="text"
              name="name"
              placeholder="type name here"
            />
          </Col>
          <Col span={12}>
            {/* <Autocomplete> */}
            <ResInput
              size="large"
              label="Enter Restaurant address"
              type="text"
              name="address"
              placeholder="type restaurant address"
            />
            {/* </Autocomplete> */}
          </Col>
          <Col span={24}>
            <ResTextArea
              label="Description"
              name="description"
              placeholder="type restaurant description"
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
            {/* <Form.Item>
              <Button
                onClick={getCurrentEndpoint}
                icon={<FaMapMarkerAlt />}
                className="bg-primary text-white "
              >
                Allow Your Map Location
              </Button>
            </Form.Item> */}
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
