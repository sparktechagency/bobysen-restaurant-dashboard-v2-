/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { toast } from "sonner";
import FileUpload from "../../../component/FileUpload";
import ResForm from "../../../component/Form/FormProvider";
import ResSelect from "../../../component/Form/ResSelect";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import UseImageUpload from "../../../hooks/useImageUpload";
import { useInsertBannerMutation } from "../../../redux/features/banner/bannerApi";
import { useGetAllRestaurantForadminQuery } from "../../../redux/features/restaurant/restaurantApi";

const CreateModal = ({ setshow }: any) => {
  const [insertBanner] = useInsertBannerMutation();
  const { data: Restaurant } = useGetAllRestaurantForadminQuery({});
  const options = Restaurant?.data?.map((data: any) => {
    return {
      label: data?.name,
      value: data?._id,
    };
  });
  const { imageUrl, setFile, imageFile } = UseImageUpload();
  const addBanner = async (data: any) => {
    console.log(data);
    const toastId = toast.loading("Creating...");
    try {
      const formData = new FormData();
      formData.append("file", imageFile as File);
      formData.append("data", JSON.stringify(data));
      await insertBanner(formData).unwrap();
      toast.success("Banner added successfully", {
        id: toastId,
        duration: 2000,
      });
      setshow(false);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <div className="flex flex-col justify-center ">
      <div className="block mx-auto">
        <FileUpload setSelectedFile={setFile} imageUrl={imageUrl} />
      </div>
      <ResForm onSubmit={addBanner}>
        <ResSelect
          options={options}
          name="restaurant"
          label="Select Restaurant"
          placeholder="select restaurant"
          size="large"
        />
        <Button
          htmlType="submit"
          className="bg-primary text-white font-500 w-full h-[40px] mt-4"
        >
          Submit
        </Button>
      </ResForm>
    </div>
  );
};

export default CreateModal;
