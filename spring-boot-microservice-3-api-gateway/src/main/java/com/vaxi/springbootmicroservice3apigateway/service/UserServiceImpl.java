package com.vaxi.springbootmicroservice3apigateway.service;

import com.vaxi.springbootmicroservice3apigateway.model.Role;
import com.vaxi.springbootmicroservice3apigateway.model.User;
import com.vaxi.springbootmicroservice3apigateway.repository.UserRepository;
import com.vaxi.springbootmicroservice3apigateway.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    //Inyeccion de Mantenimiento a los User
    @Autowired
    private UserRepository userRepository;

    //Llamando al metodo encriptador
    @Autowired
    private PasswordEncoder passwordEncoder;

    //Llamndo al token para agrhar al user
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    //Metodo para registrar y alamacenar un usr dentro de la BD
    public User saveUser(User user){
        //Bien sabemos que debemos recibir la password encriptada
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        user.setFechaCreacion(LocalDateTime.now());
        //Modificacion para leer el user con su token desde la DB agregango el toque  a la variable userCreate
        User userCreate =  userRepository.save(user);

        //Creando el token
        String jwt = jwtProvider.generateToken(userCreate);
        userCreate.setToken(jwt);

        return userCreate;
    }

    //Devolciendo usuario por el userName
    @Override
    public Optional<User> findByUsername(String username){

        return userRepository.findByUsername(username);
    }

    //Actualizar el Roll del User
    //Como este metodo trabaja con una setencia sql DIRECTA debo colocar la anotacion transaccional
    @Transactional
    @Override
    public void changeRole(Role newRole, String username){

        userRepository.updateUserRole(username, newRole);
    }

    @Override
    public User findByUsernameReturnToken(String username){
        //El cliente me envia el token, debo carpturarlo por medio de este metodo
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario no existe: " + username));
        String jwt = jwtProvider.generateToken(user);
        user.setToken(jwt);
        return user;
    }

}
