package dev.suave.kikunuani;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class KikunuaniApplication {

	public static void main(String[] args) {
		SpringApplication.run(KikunuaniApplication.class, args);
	}

	@GetMapping("/")
	public String apiRoot(){
		return "Hello, World";
	}
}
