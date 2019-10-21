package com.anup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {

//	@Autowired
//	private BCryptPasswordEncoder passwordEncoder;
//
//	@Autowired
//	private UserRepository userRepository;

//	@PostConstruct
//	public void init() {
//		User user = new User("Anup", "Mridha", "info@gmail.com", passwordEncoder.encode("password"),
//				Arrays.asList(new Role("ROLE_USER"), new Role("ROLE_ADMIN")));
//
//		if (userRepository.findByEmail(user.getEmail()) == null) {
//			userRepository.save(user);
//		}
//	}

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

}
