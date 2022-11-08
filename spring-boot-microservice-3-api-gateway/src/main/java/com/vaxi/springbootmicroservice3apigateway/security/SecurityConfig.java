package com.vaxi.springbootmicroservice3apigateway.security;

import com.vaxi.springbootmicroservice3apigateway.model.Role;
import com.vaxi.springbootmicroservice3apigateway.security.jwt.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //Seteando la Configuraciond e Seguridad anteriores y pahts de proteccion y publicos
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(
                AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder);

        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

        //Mejorando el codigo
        http.cors();
        http.csrf().disable();
        http.authenticationManager(authenticationManager);
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        //Phats Publicos registrar y login

        http
//                .csrf().disable()
//                .cors().disable()
                .authorizeRequests()
                .antMatchers("/api/authentication/sign-in", "/api/authentication/sign-up")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/gateway/inmueble").permitAll() //Nueva linea service Inmuebles - Acceso Publico
                .antMatchers("/gateway/inmueble/**").hasRole(Role.ADMIN.name())//Administacion de inmueblesd autenticados y admins
                .anyRequest().authenticated();

        //Agregando la validacion del filter por el JWT
        http.addFilterBefore(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
//                .and()
//                .authenticationManager(authenticationManager)
//                .addFilterBefore(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();

    }

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter(){
        return new JwtAuthorizationFilter();
    }

}
