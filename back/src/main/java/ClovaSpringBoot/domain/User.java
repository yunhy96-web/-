package ClovaSpringBoot.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name="users")
@NoArgsConstructor
@Getter
@Entity
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id", updatable = false)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "image")
    private String image;

    @Builder
    public User(String username, String nickname, String image){
        this.username = username;
        this.nickname = nickname;
        this.image = image;
    }
    //여기 아래 부분들이 다 유저디테일들

}
