import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerDashboard from "../components/sellerDashboard";

const SellPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/isAdmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
        });

        const data = await response.json();
        console.log("Admin Check Response:", data); // Debugging log

        if (data.success) {
          setIsAdmin(true);
        } else {
          console.log("User is not an admin, redirecting to login"); // Debugging log
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner, or some other placeholder
  }

  if (!isAdmin) {
    return null; // or a message indicating the user is not authorized
  }

  return (
    <div>
      <SellerDashboard />
    </div>
  );
};

export default SellPage;