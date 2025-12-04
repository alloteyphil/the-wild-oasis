import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      // Check if this is admin creating a user vs self-signup
      const isCreatingOtherUser = !data?.user;
      if (isCreatingOtherUser) {
        toast.success("User successfully created!", { duration: 3000 });
      } else {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address.",
        { duration: 7000 }
      );
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
  });

  return { signup, isLoading };
}
