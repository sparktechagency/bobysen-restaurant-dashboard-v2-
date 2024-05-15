import { TSidebarItem, TUserPath } from "../types";
import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: `/${role}/${item.path}`,
        icon: item.icon,
        label: (
          <NavLink className="font-500 text-16" to={`/${role}/${item.path}`}>
            {item.name}
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name as string,
        label: <p className="font-500 text-16">{item.name}</p>,
        icon: item?.icon,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              icon: child?.icon,
              label: (
                <NavLink className="font-500" to={`/${role}/${child.path}`}>
                  {child.name}
                </NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
