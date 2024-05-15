import { MdRestaurant } from "react-icons/md";

const RestaurantCard = ({ total }: { total: number }) => {
  return (
    <div className="bg-white w-[400px] py-6 px-4 rounded">
      <div className="flex justify-between">
        <div>
          <MdRestaurant size={80} />
        </div>
        <div>
          <h1 className="text-32 font-600 text-primary text-end">
            {total || 0}
          </h1>
          <h1 className="text-24 font-600 text-gray ">Total Restaurants</h1>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
