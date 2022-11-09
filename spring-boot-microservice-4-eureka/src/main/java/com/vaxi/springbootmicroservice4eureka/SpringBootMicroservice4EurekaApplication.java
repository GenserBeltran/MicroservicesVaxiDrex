package com.vaxi.springbootmicroservice4eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer //Le digo que este Microservicio se trata de un euraka server
@SpringBootApplication
public class SpringBootMicroservice4EurekaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootMicroservice4EurekaApplication.class, args);
	}

}
