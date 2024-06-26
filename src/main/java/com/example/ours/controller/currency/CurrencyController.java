package com.example.ours.controller.currency;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CurrencyController {
    private static final Logger log = LoggerFactory.getLogger(CurrencyController.class);


    // 환율 api key
    @Value("${currency.api.Key}")
    private String currencyApiKey;

    @GetMapping("/currency")
    public String getCurrencyRate (){

        log.info(">>>>>>>>>> Start CurrencyRate >>>>>>>>>>");

        LocalDate currentDate = LocalDate.now();
        String searchdate =  currentDate.minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String data = "AP01"; // AP01 : 환율, AP02 : 대출금리, AP03 : 국제금리

        // String reqUrl = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey="+authKey+"&searchdate="+searchdate+"&data="+data;
        String reqUrl = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey="+currencyApiKey+"&searchdate=20240605&data="+data;

        // 분류될 데이터를 담을 저장소
        JsonArray jsonList = new JsonArray();
        try{
            // Request URL
            URL url = new URL(reqUrl);

            // HttpURLConnection 객체 생성 , URL에 대한 연결을 열기
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            // 응답상태 확인
            int status = conn.getResponseCode();
            if( status == HttpURLConnection.HTTP_OK){
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();

                while((inputLine = in.readLine()) != null){
                    response.append(inputLine);
                }
                in.close();

                // JSON 파싱 > 응답 출력
                JsonElement jsonElement = JsonParser.parseString(response.toString());
                JsonArray jsonArray = jsonElement.getAsJsonArray();

                for(JsonElement element : jsonArray){
                    JsonObject job1 = element.getAsJsonObject();
                    String curUnit = job1.get("cur_unit").getAsString(); // 통화 코드(약어)
                    String curNm = job1.get("cur_nm").getAsString(); // 국가명
                    String dealBasR = job1.get("deal_bas_r").getAsString(); // 매매기준율( 환율우대 x, 은행별 고시환율 적용 x )

                    JsonObject job2 = new JsonObject();
                    job2.addProperty("curUnit", curUnit);
                    job2.addProperty("curNm", curNm);
                    job2.addProperty("dealBasR", dealBasR);

                    System.out.println("[코드명: " + curUnit + "] [국가명: " + curNm + "] [환율액: " + dealBasR+ "]");

                    if(curUnit.equals("KRW") || curUnit.equals("EUR")){
                        jsonList.add(job2);
                    }
                }
            }else{
                System.out.println("GET request failed.");
            }

        }catch (Exception e){
            e.getStackTrace();
        }

        return jsonList.toString();
    }
    
    // 공휴일 및 주말에 searchdate 예외처리 필요
    private void getSearchdate(){
        // 예외처리 시작
    }

}

