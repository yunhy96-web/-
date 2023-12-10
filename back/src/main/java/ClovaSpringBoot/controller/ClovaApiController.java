package ClovaSpringBoot.controller;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/clova")
public class ClovaApiController {

    private final String apiUrl = "https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-002";
    private final String clovaStudioApiKey = "NTA0MjU2MWZlZTcxNDJiY99YyUqar8st3ycFIZjl2dJ6odngEaoG1eThuYBALdW9qY8x4uLLBEXItGFv+1eLZNRMDtmiUYwmliLzObtGaZNCqFJ04laLxQ6Zz080630qzIO+R0RS61ZUsYcGgJn561I3jrwQOTbsTJwBG/QY90dX7mJfBpF7IH/jseDv/8gqKht2gmHheqmgSYSLhuN103Fq4nbuKbF5LIVBqfTdd2w=";
    private final String apiGatewayApiKey = "nnLIKzOCeByVFAY1xYNDZwNrkCrOByJiykhu2nPx";
    private final String clovaStudioRequestId = "006291727509487e9b395a88d5d2e4c5";

    @GetMapping("/send-request")
    public ResponseEntity<String> sendRequestToExternalApi(@RequestBody String requestBody) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-NCP-CLOVASTUDIO-API-KEY", clovaStudioApiKey);
        headers.set("X-NCP-APIGW-API-KEY", apiGatewayApiKey);
        headers.set("X-NCP-CLOVASTUDIO-REQUEST-ID", clovaStudioRequestId);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

        System.out.println(responseEntity);

        return responseEntity;
    }

    @PostMapping("/send-request2")
    public ResponseEntity<String> sendRequestToExternalApi(@RequestBody Map<String, String> requestMap) {
        String content = requestMap.get("content");
        String content2 = requestMap.get("content2");
        String content3 = requestMap.get("content3");
        System.out.println(content);
        System.out.println(content2);
        System.out.println(content3);
        String requestBody = buildRequestBody(content, content2, content3);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-NCP-CLOVASTUDIO-API-KEY", clovaStudioApiKey);
        headers.set("X-NCP-APIGW-API-KEY", apiGatewayApiKey);
        headers.set("X-NCP-CLOVASTUDIO-REQUEST-ID", clovaStudioRequestId);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

        System.out.println(responseEntity);

        return responseEntity;
    }


    private String buildRequestBody(String content, String content2, String content3) {
        // 전달할 JSON 형식의 데이터를 만듭니다.
        return "{\n" +
                "  \"messages\" : [ {\n" +
                "    \"role\" : \"system\",\n" +
                "    \"content\" : \"전달한 기간과 여행지 기준으로 여행 일정을 만들어줘\\n- 날짜는 0000년 00월 00일 형식으로 만들어줘\\n- 각 일자마다 오전, 오후, 저녁으로 나누어서 일정 3개씩 만들어줘\\n- 일정은 한 가지씩만 추천해줘\\n- 관심사가 있으면 관심사 위주로 일정을 만들어줘\\n- 날짜에 해당하는 여행지의 계절을 파악해서 일정을 만들어줘.\\n- 날짜는 ':'로 끝나야 해\\n- 반환할 때에는 일정 리스트: [{date: '0000년 00월 00일', todoList:{오전:'',오후:'',저녁:''}}] 형태로 반환해줘.\"\n" +
                "  }, {\n" +
                "    \"role\" : \"user\",\n" +
                "    \"content\" : \"" + content + " " + content2 + " " + content3 + "\"\n" +
                "  } ],\n" +
                "  \"topP\" : 0.8,\n" +
                "  \"topK\" : 0,\n" +
                "  \"maxTokens\" : 1000,\n" +
                "  \"temperature\" : 0.1,\n" +
                "  \"repeatPenalty\" : 1.0,\n" +
                "  \"stopBefore\" : [ ],\n" +
                "  \"includeAiFilters\" : true\n" +
                "}";
    }

}
