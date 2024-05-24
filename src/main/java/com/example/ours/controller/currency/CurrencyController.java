package com.example.ours.controller.currency;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
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

    // 환율 api : https://www.koreaexim.go.kr/ir/HPHKIR020M01?apino=2&viewtype=C&searchselect=&searchword=
    // request URL : https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=AUTHKEY1234567890&searchdate=20180102&data=AP01
    // personal key : QhvG55YHoU8Z0QJeivZoP5K1BMaDkFXU
    // 비영업일의 데이터, 혹은 영업당일 11시 이전에 해당일의 데이터를 요청할 경우 null 값이 반환

    @GetMapping("/currency")
    public BigDecimal getCurrencyRate (){

        LocalDate currentDate = LocalDate.now();

        String authKey = "QhvG55YHoU8Z0QJeivZoP5K1BMaDkFXU";
        String searchdate =  currentDate.minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String data = "AP01"; // AP01 : 환율, AP02 : 대출금리, AP03 : 국제금리

        String reqUrl = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey="+authKey+"&searchdate="+searchdate+"&data="+data;

        try{
            // Request URL
            URL url = new URL(reqUrl);
            
            // HttpURLConnection 객체 생성 , URL에 대한 연결을 열기
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            // 응답상태 확인
            int status = conn.getResponseCode();

            // 응답이 성공적인 경우 데이터 출력
            if( status == HttpURLConnection.HTTP_OK){
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();

                while((inputLine = in.readLine()) != null){
                    response.append(inputLine);
                }
                in.close();

                // 응답 출력
                System.out.println("Response : " + response.toString());

                // JSON 파싱 > 응답 출력
                JsonElement jsonElement = JsonParser.parseString(response.toString());
                JsonArray jsonArray = jsonElement.getAsJsonArray();

                for(JsonElement element : jsonArray){
                    // System.out.println(element.getAsJsonObject().toString());
                    JsonObject job = element.getAsJsonObject();
                    String curUnit = job.get("cur_unit").getAsString(); // 통화 코드(약어)
                    String curNm = job.get("cur_nm").getAsString(); // 국가명
                    String dealBasR = job.get("deal_bas_r").getAsString(); // 매매기준율( 환율우대 x, 은행별 고시환율 적용 x )

                    // 출력
                    System.out.println("[코드명: " + curUnit + "] [국가명: " + curNm + "] [환율액: " + dealBasR+ "]");
                }
            }else{
                System.out.println("GET request failed.");
            }

        }catch (Exception e){
            e.getStackTrace();
        }

        return null;
    }

}

