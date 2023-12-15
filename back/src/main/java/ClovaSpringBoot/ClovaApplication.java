package ClovaSpringBoot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ClovaApplication {
    public static void main(String[] args) {
        SpringApplication.run(ClovaApplication.class, args);
        System.out.println("1");
        System.out.println("2");
        System.out.println("3");
    }
}
