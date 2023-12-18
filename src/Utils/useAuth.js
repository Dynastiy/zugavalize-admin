/* eslint-disable  */
import axios from "./axios.config";
import { getUsers } from "@/Utils/getUser.js";

//error Logger Function
const errorLogger = (error, dis) => {
  console.log(error);
  error.map((err) => {
    for (const [_, value] of Object.entries(err)) {
      dis.$toast.error(value[0]);
    }
  });
};

export const useLogin = async (
  credentials,
  store,
  router,
  dis,
  handleLoading
) => {
  handleLoading(true);
  await axios
    .post("/users/login/", credentials, {
      headers: {
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJpYXQiOjE2NjMzNjM3MjksImV4cCI6MTY3OTE0MzcyOSwidXNlciI6eyJpZCI6MywidXNlcm5hbWUiOiJIb3JwZXloZXJtaSIsInJvbGVzIjpbImFkbWluaXN0cmF0b3IiXX19.fEVITFV7G8jm1rTMJT5rduH8S_7oETWslbQeLdSkCDU",
      },
    })
    .then((response) => {
      console.log(response);
      store.dispatch("setUser", response.data.data);
      const { user_id } = response.data.data;
      const { access_token } = response.data.data;
      getUsers(user_id, access_token, store, router, dis, handleLoading);
    })
    .catch((error) => {
      handleLoading(false);
      dis.$toast.error(error.response.data.error[0]);
      console.log(error);
    });
};