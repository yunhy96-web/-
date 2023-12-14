package ClovaSpringBoot.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class KakaoOauthRs {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("properties")
    private KakaoProperties kakaoProperties;
}
