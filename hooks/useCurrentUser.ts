import { useEffect, useState } from "react";

import { getCurrentUser } from "@/services/users/userService";

const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();

      setUser(user);
    };

    fetchCurrentUser();
  }, []);

  return user;
};

export default useCurrentUser;
