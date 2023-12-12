package ClovaSpringBoot.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name="detailplans")
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class DetailPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 1씩 자동 증가
    @Column(name = "detail_id", updatable = false)
    private Long id;

    @Column(name = "detail_content" , nullable = false)
    private String detailContent;

    @ManyToOne
    @JoinColumn(name = "plan_id") //plan 에 있는 id와 조인하겠다는 뜻
    private Plan plan;

    @Builder
    public DetailPlan(String detailContent, Plan plan){
        this.detailContent = detailContent;
        this.plan = plan;
    }

    public void update(String detailContent){
        this.detailContent = detailContent;
    }
}
