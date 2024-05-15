import FileUpload from "../../component/FileUpload";
import ProfileForm from "../../component/ProfileForm";
import UseImageUpload from "../../hooks/useImageUpload";
import { useProfileQuery } from "../../redux/features/auth/authApi";
import showImage from "../../utils/showImage";
const Profile = () => {
  const { imageUrl, setFile, imageFile } = UseImageUpload();
  const { data: profile } = useProfileQuery(undefined);
  return (
    <div className="flex justify-center">
      <div className="">
        <div className="flex items-center  gap-x-4 text-white ">
          <div>
            <FileUpload
              imageUrl={imageUrl ?? showImage(profile?.data?.image)}
              setSelectedFile={setFile}
            />
          </div>
          <h1 className="text-40 text-black font-600">
            {profile?.data?.fullName}
          </h1>
        </div>
        <div className="w-[800px]">
          <ProfileForm ProfileData={profile} imageFile={imageFile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
