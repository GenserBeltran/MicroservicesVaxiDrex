package com.vaxi.springbootmicroservice3apigateway.repository;

import com.vaxi.springbootmicroservice3apigateway.model.Role;
import com.vaxi.springbootmicroservice3apigateway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    //Data por UserName
    Optional<User> findByUsername(String username);

    //Actualiza la data del user segun el role
	
	 Optional<User> findByEmail(String email);

    @Modifying
    @Query("update User set role=:role where username=:username")
    void updateUserRole(@Param("username") String username, @Param("role") Role role);

}
