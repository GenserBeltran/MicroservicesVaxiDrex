package com.vaxi.springbootmicroservice3apigateway.security.jwt;

import com.vaxi.springbootmicroservice3apigateway.model.User;
import com.vaxi.springbootmicroservice3apigateway.security.UserPrincipal;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public interface JwtProvider {
    //mETODO PARA CREAR EL TOKEN y sobreescrito en la interface
    String generateToken(UserPrincipal auth);

    //Metodo para llamar el token desde la DB luego de autenticado el User
    String generateToken(User user);

    //Metodo para obtener la autenticacion
    Authentication getAuthentication(HttpServletRequest request);

    boolean isTokenValid(HttpServletRequest request);
}
