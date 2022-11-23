package com.vaxi.springbootmicroservice3apigateway.request;

import feign.auth.BasicAuthRequestInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfiguration {

    //Creando conexion segura entro los microservicios
    @Bean
    public BasicAuthRequestInterceptor basicAuthRequestInterceptor(
            //Seteando password y user de modo dinamico para los users
            @Value("${service.security.secure-key-username}") String username,
            @Value("${service.security.secure-key-password}") String password){
        return new BasicAuthRequestInterceptor(username, password);
    }
}
