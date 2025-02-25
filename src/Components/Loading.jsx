import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import "../Styles/loading.css";

export default function Loading() {
  const [isPageLoaded, setIsPageLoaded] = useState(true); 
  const location = useLocation(); 

  useEffect(() => {
    setIsPageLoaded(false); 

    const timeout = setTimeout(() => {
      setIsPageLoaded(true); 
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.pathname]); 

  if (!isPageLoaded) {
    return (
      <div className="container">
        <motion.span
          className="loader"
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return null; 
}
