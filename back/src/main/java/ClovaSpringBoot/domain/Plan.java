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
import java.util.List;

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

    @Column(name = "groupid" , nullable = false)
    private Long groupid;

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

    //필요없으면 삭제해야하는 코드
//    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<DetailPlan> detailPlans;
//
//    public Long getGroupid() {
//        return groupid;
//    }
//
//    // 추가: groupid 필드의 setter 메서드
//    public void setGroupid(Long groupid) {
//        this.groupid = groupid;
//    }

    @Builder //빌더패턴으로 객체 생성
    public Plan(Long groupid, String realday, String content, String email, String time, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.groupid = groupid;
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