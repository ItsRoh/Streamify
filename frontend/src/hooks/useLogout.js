import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api.js";

const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.clear();
    },
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;