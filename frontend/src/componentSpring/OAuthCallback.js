import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("OAuth callback loaded");
  console.log("Full URL:", window.location.href);
     const hash = window.location.hash; 

    const token = new URLSearchParams(hash.replace("#", "")).get(
      "access_token"
    );
    //const hash = location.hash;
    //const token = new URLSearchParams(hash.substring(1)).get("access_token");
    //const params = new URLSearchParams(location.search);
    //const token = params.get("token");

    if (token) {
      // Keep backward compatibility with older frontend versions.
      localStorage.setItem("token", token);
      localStorage.setItem("access_token", token);
      console.log("Token saved");
      // Replace route to ensure Display loads with the latest stored token.
      window.location.replace("/Display");
    } else {
      console.error("No token found");
    }
  }, [location, navigate]);

  return <h2>Logging in...</h2>;
}

export default OAuthCallback;
/*function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    const token = new URLSearchParams(hash.substring(1)).get("access_token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token saved:", token);
      navigate("/Display");
    } else {
      console.error("No token found");
    }
  }, []);
  

  return <h2>Logging in...</h2>;
}

export default OAuthCallback;*/