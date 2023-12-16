package ClovaSpringBoot.domain;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Table(name="groupplans")
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class GroupPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 1씩 자동 증가
    @Column(name = "group_plan_id", updatable = false)
    private Long id;

    @Column(name = "groupId" , nullable = true)
    private Long groupid;

    @Column(name = "destination" , nullable = false)
    private String destination;

    @Column(name = "period" , nullable = false)
    private String period;

    @Column(name = "userId" , nullable = false)
    private Long userid;

    @Column(name = "passed" , nullable = false)
    private boolean passed;

    @Builder //빌더패턴으로 객체 생성
    public GroupPlan(Long groupid, String destination, String period, Long userid, boolean passed) {
        this.groupid = groupid;
        this.destination = destination;
        this.period = period;
        this.userid = userid;
        this.passed = passed;
    }
}
