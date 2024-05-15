import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Button, ConfigProvider } from "antd";
import { MdDoneOutline } from "react-icons/md";
import {
  useGetContentQuery,
  useInsertContentMutation,
} from "../../redux/features/content/contentApi";
import { toast } from "sonner";
import ErrorResponse from "../../component/UI/ErrorResponse";

const AboutUs = () => {
  const editor = useRef(null);
  const { data: contentData } = useGetContentQuery({});
  const [content, setContent] = useState(contentData?.data?.aboutUs);
  const [insertContentIntoDb] = useInsertContentMutation();
  const onSubmit = async () => {
    const toastId = toast.loading("Creating....");
    if (!content) {
      toast.error("Please insert some content before submitting", {
        id: toastId,
        duration: 2000,
      });
    }

    try {
      await insertContentIntoDb({ aboutUs: content }).unwrap();
      toast.success("About us inserted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <ConfigProvider>
      <div>
        <h1 className="text-primary text-32 font-600  mb-4">About Us</h1>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={onSubmit}
            className="bg-primary flex items-center border-0 font-600 "
            size="large"
            icon={<MdDoneOutline />}
          >
            Submit
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AboutUs;
