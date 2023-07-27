import { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";

const Watchlist = () => {
  const [testMessage, setTestMessage] = useState();

  //https://docs.amplify.aws/lib/restapi/authz/q/platform/js/
  // figure out how to auth the api

  useEffect(() => {
    const apiName = "api";
    const path = "/watchlist";
    const myInit = {
      headers: {}, // OPTIONAL
    };

    API.get(apiName, path, myInit)
      .then((response) => {
        console.log(response);
      })

      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <>
      <div>watchlist</div>
    </>
  );
};

export default Watchlist;
