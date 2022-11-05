package com.vaxi.springbootmicroservice3apigateway.service;

import com.vaxi.springbootmicroservice3apigateway.model.Role;
import com.vaxi.springbootmicroservice3apigateway.model.User;

import java.util.Optional;

public interface UserService {
    //Metodo para registrar y alamacenar un usr dentro de la BD
    User saveUser(User user);

    //Devolciendo usuario por el userName
    Optional<User> findByUserName(String username);

    //Actualizar el Roll del User
    void changeRole(Role newRole, String userName);
}
