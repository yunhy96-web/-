package ClovaSpringBoot.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name="detailplans")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class DetailPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 1씩 자동 증가
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "detail_content" , nullable = false)
    private String detialContent;

    @ManyToOne
    @JoinColumn(name = "id") //plan 에 있는 id와 조인하겠다는 뜻
    private Plan plan;
}
