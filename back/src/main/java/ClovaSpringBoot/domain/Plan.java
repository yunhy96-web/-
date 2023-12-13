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
import java.util.ArrayList;
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

    @Column(name = "groupid" , nullable = true)
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

    //추가 코드 안되면 이부분 삭제
//    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<DetailPlan> detailPlans = new ArrayList<>();
//
//    public void addDetailPlan(DetailPlan detailPlan) {
//        detailPlans.add(detailPlan);
//        detailPlan.setPlan(this);
//    }
//
//    public void removeDetailPlan(DetailPlan detailPlan) {
//        detailPlans.remove(detailPlan);
//        detailPlan.setPlan(null);
//    }
    //삭제

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