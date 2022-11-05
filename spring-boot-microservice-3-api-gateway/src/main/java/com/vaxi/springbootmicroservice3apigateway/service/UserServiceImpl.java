package com.vaxi.springbootmicroservice3apigateway.service;

import com.vaxi.springbootmicroservice3apigateway.model.Role;
import com.vaxi.springbootmicroservice3apigateway.model.User;
import com.vaxi.springbootmicroservice3apigateway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    //Metodo para registrar y alamacenar un usr dentro de la BD
    public User saveUser(User user){
        //Bien sabemos que debemos recibir la password encriptada
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        user.setFechaCreacion(LocalDateTime.now());

        return userRepository.save(user);
    }

    //Devolciendo usuario por el userName
    @Override
    public Optional<User> findByUserName(String username){
        return userRepository.findByUserName(username);
    }

    //Actualizar el Roll del User
    //Como este metodo trabaja con una setencia sql DIRECTA debo colocar la anotacion transaccional
    @Transactional
    @Override
    public void changeRole(Role newRole, String userName){
        userRepository.updateUserRole(userName, newRole);
    }

}
