import notFoundImage from "./assets/404-status-code.png";
const NotFound = () => {
  return (
    <div>
      <img src={notFoundImage} alt="" className="object-cover " />
    </div>
  );
};

export default NotFound;
