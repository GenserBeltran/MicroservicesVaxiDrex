package com.vaxi.springbootmicroservice3apigateway.service;

import com.vaxi.springbootmicroservice3apigateway.model.User;
import com.vaxi.springbootmicroservice3apigateway.repository.UserRepository;
import com.vaxi.springbootmicroservice3apigateway.security.UserPrincipal;
import com.vaxi.springbootmicroservice3apigateway.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    //Objeto de autenticacion manager
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

//Por el metodo de buscar por correo
    @Autowired
    private UserRepository userRepository;

    @Override
    public User signInAndReturnJWT(User signInRequest){
//Por el metodo de buscar por correo
 User user = userRepository.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("El usuario no fue encontrado:" + signInRequest.getEmail()));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), signInRequest.getPassword())
        );

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        //Obteniendo el token
        String jwt = jwtProvider.generateToken(userPrincipal);

        User sigInUser = userPrincipal.getUser();

        sigInUser.setToken(jwt);

        return sigInUser;

    }

}
