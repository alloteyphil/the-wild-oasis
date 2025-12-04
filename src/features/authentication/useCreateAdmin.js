import { useMutation } from "@tanstack/react-query";
import { createInitialAdmin } from "../../services/apiSeed.js";
import toast from "react-hot-toast";

export function useCreateAdmin() {
  const { mutate: createAdmin, isLoading } = useMutation({
    mutationFn: createInitialAdmin,
    onSuccess: () => {
      toast.success("Admin account created! You can now log in with the demo credentials.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create admin account");
    },
  });

  return { createAdmin, isLoading };
}

