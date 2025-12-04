import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, hasAnyUsers } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: async (error) => {
      console.error("Login error:", error);
      const errorMessage = error?.message || "An error occurred during login";
      
      // Check if no users exist to provide helpful message
      try {
        const usersExist = await hasAnyUsers();
        if (!usersExist) {
          toast.error("No admin account exists. Please create one first using the seed function.", {
            duration: 5000,
          });
        } else {
          toast.error(errorMessage);
        }
      } catch (err) {
        toast.error(errorMessage);
      }
    },
  });

  return { login, isLoading };
}
