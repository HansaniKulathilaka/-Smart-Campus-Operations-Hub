/*package com.example.project.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
public SecurityFilterChain securityFilterChain(
        HttpSecurity http,
        ClientRegistrationRepository repo) throws Exception {

    DefaultOAuth2AuthorizationRequestResolver resolver =
            new DefaultOAuth2AuthorizationRequestResolver(
                    repo,
                    "/oauth2/authorization"
            );

    resolver.setAuthorizationRequestCustomizer(customizer ->
            customizer.additionalParameters(params -> {
                params.put("prompt", "select_account"); // FORCE ACCOUNT SELECT
            })
    );

    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/oauth2/**", "/login/**").permitAll()
            .anyRequest().authenticated()
        )
        .oauth2Login(oauth -> oauth
            .authorizationEndpoint(auth ->
                auth.authorizationRequestResolver(resolver)
            )
        )
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

    return http.build();
}
}*/