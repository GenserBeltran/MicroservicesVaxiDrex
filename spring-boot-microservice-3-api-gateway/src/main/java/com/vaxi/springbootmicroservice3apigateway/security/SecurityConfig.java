package com.vaxi.springbootmicroservice3apigateway.security;

import com.vaxi.springbootmicroservice3apigateway.security.jwt.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    //Inyectando un Objeto que reprensa a un user de nuestra app
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    //Metodo para encriptar el passwoor
    @Autowired
    private PasswordEncoder passwordEncoder;

    //Autenticacion para validar los User
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    //Metodo Principal
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity htpp) throws Exception {
        //Seteando la Configuraciond e Seguridad anteriores y pahts de proteccion y publicos
        AuthenticationManagerBuilder authenticationManagerBuilder = htpp.getSharedObject(
                AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder);

        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

        //Phats Publicos registrar y login

        htpp
                .csrf().disable()
                .cors().disable()
                .authorizeRequests()
                .antMatchers("/api/authentication/sing-in", "/api/authentication/sing-up")
                .permitAll()
                .and()
                .authenticationManager(authenticationManager)
                .addFilterBefore(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return htpp.build();

    }

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter(){
        return new JwtAuthorizationFilter();
    }

}
