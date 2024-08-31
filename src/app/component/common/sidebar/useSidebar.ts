// src/hooks/useSidebar.js
import { useEffect, useState } from "react";
import axios from "axios";
import HTTP_REQUEST from "@/utils/axiosConfig";

const useSidebar = ({ userId, sessionId }: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await HTTP_REQUEST.get(
            `/chat/list?userId=${userId}`
          );

          setData(response.data);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [userId, sessionId]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window?.innerWidth >= 768);
      setIsMobile(window?.innerWidth < 768);
    };

    // Call the function to check initial window width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { data, loading, error, toggleSidebar, isOpen, setIsOpen, isMobile };
};

export default useSidebar;
