/*package com.example.project.demo.Authentication;

//import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class Authentication {

    private final handleAuth handleAuth;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public Authentication(handleAuth handleAuth, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.handleAuth = handleAuth;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /*@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of(HttpHeaders.AUTHORIZATION));
        configuration.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
    .cors(Customizer.withDefaults())
    .csrf(csrf -> csrf.disable())
    .sessionManagement(session -> 
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    )
    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
    .authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        .requestMatchers(
            "/",
            "/login",
            "/login/**",
            "/oauth2/**",
            "/login/oauth2/**",
            "/error"
        ).permitAll()
        .anyRequest().authenticated()
    )
    .oauth2Login(oauth -> oauth.successHandler(handleAuth));

        return http.build();
    }*/
   /*@Bean
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
}*/
/*@Bean
public SecurityFilterChain securityFilterChain(
        HttpSecurity http,
        ClientRegistrationRepository repo,
        handleAuth handleAuth) throws Exception {

    DefaultOAuth2AuthorizationRequestResolver resolver =
            new DefaultOAuth2AuthorizationRequestResolver(
                    repo,
                    "/oauth2/authorization"
            );

    resolver.setAuthorizationRequestCustomizer(customizer ->
            customizer.additionalParameters(params -> {
                params.put("prompt", "select_account");
            })
    );

    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/oauth2/**", "/login/**").permitAll()
            .requestMatchers("/notification/**").authenticated()
            .anyRequest().authenticated()
        )
        .oauth2Login(oauth -> oauth
            .authorizationEndpoint(auth ->
                auth.authorizationRequestResolver(resolver)
            )
            .successHandler(handleAuth)   // 🔥 REQUIRED
        )
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // 🔥 FIX
        );

    return http.build();
}*/

/*@Bean
public SecurityFilterChain securityFilterChain(
        HttpSecurity http,
        ClientRegistrationRepository repo,
        handleAuth handleAuth) throws Exception {

    DefaultOAuth2AuthorizationRequestResolver resolver =
            new DefaultOAuth2AuthorizationRequestResolver(repo, "/oauth2/authorization");

    resolver.setAuthorizationRequestCustomizer(customizer ->
            customizer.additionalParameters(params -> {
                params.put("prompt", "select_account");
            })
    );

    http
        .csrf(csrf -> csrf.disable())

       
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )

        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/oauth2/**", "/login/**").permitAll()
            .requestMatchers("/notification/**").authenticated()   // 🔥 IMPORTANT
            .anyRequest().authenticated()
        )

        
        .oauth2Login(oauth -> oauth
            .authorizationEndpoint(auth ->
                auth.authorizationRequestResolver(resolver)
            )
            .successHandler(handleAuth)
        )

         

        ;

    return http.build();
}*/
/*@Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            ClientRegistrationRepository repo) throws Exception {

        DefaultOAuth2AuthorizationRequestResolver resolver =
                new DefaultOAuth2AuthorizationRequestResolver(repo, "/oauth2/authorization");

        resolver.setAuthorizationRequestCustomizer(customizer ->
                customizer.additionalParameters(params -> {
                    params.put("prompt", "select_account");
                })
        );

        http
            // ⚠️ required for OAuth2 login
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )

            .exceptionHandling(ex -> ex
            .authenticationEntryPoint((request, response, authException) -> {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            })
        )

            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/oauth2/**", "/login/**").permitAll()
                    .requestMatchers("/notification/**").authenticated()
                    .anyRequest().authenticated()
            )

            // OAuth login (Google)
            .oauth2Login(oauth -> oauth
                    .authorizationEndpoint(auth ->
                            auth.authorizationRequestResolver(resolver)
                    )
                    .successHandler(handleAuth)
            )

            // JWT filter for API calls (stateless after login)
            .addFilterBefore(jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }*/
//}
package com.example.project.demo.Authentication;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class Authentication {

    private final handleAuth handleAuth;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public Authentication(handleAuth handleAuth,
                          JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.handleAuth = handleAuth;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // ✅ CORS CONFIG
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    // ✅ SECURITY FILTER CHAIN
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            ClientRegistrationRepository repo) throws Exception {

        DefaultOAuth2AuthorizationRequestResolver resolver =
                new DefaultOAuth2AuthorizationRequestResolver(repo, "/oauth2/authorization");

        resolver.setAuthorizationRequestCustomizer(customizer ->
                customizer.additionalParameters(params -> {
                    params.put("prompt", "select_account");
                })
        );

        http
            // ✅ CORS ENABLED
            .cors(cors -> {})

            // ❌ CSRF OFF for REST APIs
            .csrf(csrf -> csrf.disable())

            // ⚠️ OAuth2 requires session
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )

            // ✅ HANDLE UNAUTHORIZED
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                })
            )

            // ✅ AUTH RULES
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/oauth2/**", "/login/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // 🔥 CRITICAL FIX
                .requestMatchers("/notification/**").authenticated()
                .anyRequest().authenticated()
            )

            // ✅ OAUTH LOGIN
            .oauth2Login(oauth -> oauth
                .authorizationEndpoint(auth ->
                    auth.authorizationRequestResolver(resolver)
                )
                .successHandler(handleAuth)
            )

            // ✅ JWT FILTER
            .addFilterBefore(jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
