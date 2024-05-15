/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import { TUser, useCurrentUser } from "./redux/features/auth/authSlice";
import { setNotification } from "./redux/features/notification/notificationSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import PrivateRoute from "./router/PrivateRoutes";
import { socket } from "./socket";

function App() {
  const dispatch = useAppDispatch();
  const user: TUser | null = useAppSelector(useCurrentUser);
  useEffect(() => {
    socket.connect();
    const handleNotificationEvent = (data: any) => {
      dispatch(setNotification(data));
      console.log(data);
    };

    socket.on(user?.userId as string, handleNotificationEvent);

    return () => {
      // Clean up the event listener when the component is unmounted
      socket.off(user?.userId as string, handleNotificationEvent);
      socket.disconnect();
    };
  }, [user]);

  return (
    <PrivateRoute role={undefined}>
      <MainLayout />
    </PrivateRoute>
  );
}

export default App;
