import { useEffect, useState } from "react";

import { getCurrentUser } from "@/services/users/userService";

const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();

        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { user, loading };
};

export default useCurrentUser;
