package ClovaSpringBoot.controller;
import ClovaSpringBoot.domain.DetailPlan;
import ClovaSpringBoot.domain.GroupPlan;
import ClovaSpringBoot.domain.Plan;
import ClovaSpringBoot.domain.User;
import ClovaSpringBoot.dto.AddPlanRequest;
import ClovaSpringBoot.repository.GroupPlanRepository;
import ClovaSpringBoot.repository.PlanRepository;
import ClovaSpringBoot.repository.UserRepository;
import ClovaSpringBoot.service.PlanService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.time.LocalDateTime.now;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clova")
public class ClovaApiController {
    private final UserRepository userRepository;
    private final GroupPlanRepository groupPlanRepository;
    private final PlanService planService;
    private final String apiUrl = "https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-002";
    private final String clovaStudioApiKey = "NTA0MjU2MWZlZTcxNDJiY99YyUqar8st3ycFIZjl2dJ6odngEaoG1eThuYBALdW9qY8x4uLLBEXItGFv+1eLZNRMDtmiUYwmliLzObtGaZNCqFJ04laLxQ6Zz080630qzIO+R0RS61ZUsYcGgJn561I3jrwQOTbsTJwBG/QY90dX7mJfBpF7IH/jseDv/8gqKht2gmHheqmgSYSLhuN103Fq4nbuKbF5LIVBqfTdd2w=";
    private final String apiGatewayApiKey = "nnLIKzOCeByVFAY1xYNDZwNrkCrOByJiykhu2nPx";
    private final String clovaStudioRequestId = "006291727509487e9b395a88d5d2e4c5";

    private Long groupId = 0L;

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
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

    //전체 그룹 계획 조회
    @GetMapping("/totalgroupplan/{userid}")
    public List<GroupPlan> getGroupPlansByUserId(@PathVariable Long userid) {
        // userid를 기반으로 그룹 플랜을 조회
        return groupPlanRepository.findByUserid(userid);
    }

    //모든 경로로 들어오는 요청에 대해서 cors
    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/send-request2")
    public ResponseEntity<String> sendRequestToExternalApi(@AuthenticationPrincipal Authentication authentication,
                                                           @RequestBody Map<String, String> requestMap) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userRepository.findById(userId).orElseThrow(IllegalArgumentException::new);
        //groupId 서버 껏다 킬때마다 다시 0 부터 시작안하려면
        //groupId 테이블에서 맥스값을 불러와서 +해주는 로직으로 변경 해주어야함.
        groupId++;

        String content1 = requestMap.get("content1");
        String content2 = requestMap.get("content2");
        String content3 = requestMap.get("content3");
        String pattern1 = "기간: ";
        String period = content1.replaceAll(pattern1,"");
        String pattern2 = "여행지: ";
        String destination = content2.replaceAll(pattern2,"");
        //pass 된 일정인지 아닌지 구별하는 로직
        // 현재 날짜 얻기
        LocalDate currentDate = LocalDate.now();

        // " - "로 문자열을 분리하여 종료일을 얻음
        String[] dateParts = period.split(" - ");
        String endDateStr = dateParts[1];

        // 날짜 문자열을 LocalDate로 파싱
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");
        LocalDate endDate = LocalDate.parse(endDateStr, formatter);

        // 오늘 날짜와 종료일을 비교하여 초과 여부를 판단
        boolean isAfter = currentDate.isAfter(endDate);

        //그룹 플랜 생성
        GroupPlan groupPlan = GroupPlan.builder()
                .groupid(groupId)
                .destination(destination)
                .period(period)
                .userid(userId)
                .passed(isAfter)
                .build();
        // 그룹 플랜을 리포지토리를 통해 저장
        GroupPlan savedGroupPlan = groupPlanRepository.save(groupPlan);

        //클로바 일정 생성
        System.out.println(content1);
        System.out.println(content2);
        System.out.println(content3);
        String requestBody = buildRequestBody(content1, content2, content3);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-NCP-CLOVASTUDIO-API-KEY", clovaStudioApiKey);
        headers.set("X-NCP-APIGW-API-KEY", apiGatewayApiKey);
        headers.set("X-NCP-CLOVASTUDIO-REQUEST-ID", clovaStudioRequestId);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);
        String jsonString = responseEntity.toString();
        System.out.println(jsonString);

        try {
            // JSON 문자열에서 실제 JSON 부분만 추출
            int startIndex = jsonString.indexOf("{");
            int endIndex = jsonString.lastIndexOf("}") + 1;
            String jsonContent = jsonString.substring(startIndex, endIndex);

            // JSON 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonContent);

            // "result" 객체 아래에 있는 "message" 객체의 "content" 추출
            String content = jsonNode
                    .path("result")
                    .path("message")
                    .path("content")
                    .asText();

            // "일정 리스트" 안의 내용만 추출
            int scheduleListStartIndex = content.indexOf("[");
            int scheduleListEndIndex = content.lastIndexOf("]") + 1;
            String scheduleListContent = content.substring(scheduleListStartIndex, scheduleListEndIndex);

            System.out.println(scheduleListContent);

            JSONArray scheduleList = new JSONArray(scheduleListContent);
            //json 으로 파싱하는 부분
            for (int i = 0; i < scheduleList.length(); i++) {
                JSONObject day = scheduleList.getJSONObject(i);
                JSONObject todoList = day.getJSONObject("todoList");

                // 각 date와 각 일정 항목을 묶어서 출력
                System.out.println("Date: " + day.getString("date"));

                // 일정 항목을 동적으로 가져와서 출력
                for (Iterator it = todoList.keys(); it.hasNext(); ) {
                    String key = (String) it.next();
                    System.out.println(key + ": " + todoList.getString(key));
                    //여기서 저장로직
                    // AddPlanRequest 객체 생성
                    AddPlanRequest addPlanRequest = new AddPlanRequest(groupId, day.getString("date"), user, key, todoList.getString(key), now(), now());
                    // TODO: 저장 로직 구현 (예: JPA를 사용한 저장)
                    planService.save2(addPlanRequest);
                }

                System.out.println("------------------------");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("groupId", groupId);

        return ResponseEntity.ok(responseBody.toString());
    }



    private String buildRequestBody(String content, String content2, String content3) {
        // 전달할 JSON 형식의 데이터를 만듭니다.
        return "{\n" +
                "  \"messages\" : [ {\n" +
                "    \"role\" : \"system\",\n" +
                "    \"content\" : \"전달한 기간과 여행지 기준으로 여행 일정을 만들어줘\\n- 날짜는 0000년 00월 00일 형식으로 만들어줘\\n- 각 일자마다 일정 5개씩 만들어줘\\n- 일정은 한 가지씩만 추천해줘\\n- 관심사가 있으면 관심사 위주로 일정을 만들어줘\\n- 날짜에 해당하는 여행지의 계절을 파악해서 일정을 만들어줘.\\n- 날짜는 ':'로 끝나야 해\\n- 반환할 때에는 일정 리스트: [{date: '0000년 00월 00일', todoList:{1:'',2:'',3:'',4:'',5:''}}] 형태로 반환해줘.\"\n" +
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
