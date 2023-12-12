package ClovaSpringBoot.domain;

import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Table(name="plans")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 1씩 자동 증가
    @Column(name = "plan_id", updatable = false)
    private Long id;

    @Column(name = "realday" , nullable = false)
    private String realday;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "content" , nullable = false)
    private String content;

    @Column(name = "time" , nullable = false)
    private String time;

    @CreatedDate
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Builder //빌더패턴으로 객체 생성
    public Plan(String realday, String content, String email, String time, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.realday = realday;
        this.content = content;
        this.time = time;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void update(String time, String content){
        this.time = time;
        this.content = content;
    }
}