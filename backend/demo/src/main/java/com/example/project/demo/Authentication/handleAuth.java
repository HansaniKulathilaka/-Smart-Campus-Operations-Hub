package com.example.project.demo.Authentication;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.example.project.demo.model.User;
import com.example.project.demo.repository.UserRepo;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;


@Component
public class handleAuth implements AuthenticationSuccessHandler {

    private final UserRepo userRepo;
    private final JwtService jwtService;

    public handleAuth(UserRepo userRepo, JwtService jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        User user = userRepo.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPicture(picture);
            userRepo.save(user);
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", name);
        String jwt = jwtService.generateToken(email, claims);

        // Session is only needed for the OAuth redirect handshake; for REST we use JWT only.
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // Token is base64url-safe (JJWT compact). Avoid URL encoding to prevent corrupting the signature.
        response.sendRedirect("http://localhost:3000/oauth/callback#access_token=" + jwt);
    }
}

