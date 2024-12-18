/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Divider, Form, Row, Switch, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { useCallback, useState } from "react";
import MultiUpload from "../../../component/MultiUpload/MultiUpload";

import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ResForm from "../../../component/Form/FormProvider";
import ResDatePicker from "../../../component/Form/ResDatePicker";
import ResInput from "../../../component/Form/ResInput";
import ResTextArea from "../../../component/Form/ResTextarea";
import ResTimePicker from "../../../component/Form/ResTimepicker";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { days, defaultTimes } from "../../../constant/days";
import { TimeValues } from "../../../interface/time";
import { useAddRestaurantMutation } from "../../../redux/features/restaurant/restaurantApi";
import { restaurantSchema } from "../../../schema/restaurant.schema";
const containerStyle = {
  width: "800px",
  height: "300px",
};

const CreateRestaurant = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [map, setMap] = useState(null);

  const center = {
    lat: -20.3484, // Default latitude for Kuwait
    lng: 57.5522, // Default longitude for Kuwait
  };
  const [selectedPosition, setSelectedPosition] = useState(center);
  const [marker, setMarker] = useState(null);
  const cloneDays = [...days];
  const values: { [key: string]: TimeValues } = {};
  cloneDays.forEach((day: string) => {
    values[day] = { ...defaultTimes };
  });
  const navigate = useNavigate();
  const [reviewStatus, setReviewStatus] = useState(true);
  const [addRestaurant] = useAddRestaurantMutation();
  const onChange = (value: boolean) => {
    setReviewStatus(value);
  };
  const libraries: any = ["places"];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAu6RiRrpTx0SY5nnFxml5UbOpuHiGNHKI",
    libraries,
  });

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

  const onSubmit = async (data: any) => {
    const location = {
      // latitude: currentPosition?.lat,
      // longitude: currentPosition?.lng,
      coordinates: [
        parseFloat(selectedPosition?.lng as any),
        parseFloat(selectedPosition?.lat as any),
      ],
    };
    const formatedData = {
      ...data,
      location,
    };

    // check at least 5 images
    if (fileList.length <= 2) {
      toast.error("Please select 2 image before submitting..");
      return;
    }
    const toastId = toast.loading("Creating new restaurant...");
    const formData = new FormData();
    if (fileList.length > 0) {
      fileList.forEach((file: any) => {
        formData.append("files", file.originFileObj); // Append the file object
      });
    }
    formData.append("data", JSON.stringify({ ...formatedData, reviewStatus }));

    try {
      await addRestaurant(formData).unwrap();
      toast.success("Restaurant added successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate("/vendor/restaurant");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <div>
      <ResForm
        onSubmit={onSubmit}
        defaultValues={values}
        resolver={zodResolver(restaurantSchema.insertRestaurantSchema)}
      >
        <Row gutter={[14, 0]}>
          <Col span={12}>
            <Form.Item>
              <MultiUpload
                fileList={fileList as RcFile[]}
                setFileList={setFileList}
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
              <></>
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
              label="Enter Restaurant Address"
              type="text"
              name="address"
              placeholder="type address here"
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

export default CreateRestaurant;
