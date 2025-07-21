//@ts-check
/* eslint-disable react-hooks/exhaustive-deps */

// import states and effects from react
import { useState, useEffect, ReactNode } from "react";

// import session store
import { getItem } from "@/utils/sessionStore";

//import router from next
import { useRouter } from "next/router";

// session keys
import { sessionStoreKeys } from "@/utils/constants";

// init accessHoc
const accessHoc = (Component: any) => {
  // init WithAccessId component
  const WithAccessId = (props: any) => {
    // init router
    const router = useRouter();

    // init isLoading state
    const [isLoading, setIsLoading] = useState(true);

    // @ts-ignore
    // init useEffect
    useEffect(() => {
      checkAccessId();
    }, []);

    const checkAccessId = () => {
      try {
        // get accessId
        const accessId = getItem(sessionStoreKeys.accessId);
        console.log("HOC EXECUTED", accessId);
        // // check if no accessId
        if (!accessId) {
          // redirect user to homepage
          return router.replace({ pathname: "/" });
        }

        // setIsloading to false
        setIsLoading(false);
      } catch (error) {
        return router.replace({ pathname: "/" });
      }
    };

    return <>{isLoading ? <div></div> : <Component {...props} />}</>;
  };

  // return
  return WithAccessId;
};

// export AccessHoc
export default accessHoc;
