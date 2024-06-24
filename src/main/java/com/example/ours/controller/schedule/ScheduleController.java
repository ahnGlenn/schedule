package com.example.ours.controller.schedule;

import com.example.ours.dto.schedule.ScheduleDto;

import com.example.ours.service.ScheduleService;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {
    private static final Logger log = LoggerFactory.getLogger(ScheduleController.class);

    @Autowired
    private ScheduleService scheduleService;

    /*
    *  메인페이지 시작시 모든 스케줄 리스트를 가져옴(캘린더 표출 용)
    */
    @GetMapping(value = "/list")
    public List<ScheduleDto> searchList(){

        log.info(">>>>>>>>>> Search Schedule list >>>>>>>>>>");
        try {

            // search all schedule list
            List<ScheduleDto> schduleList = scheduleService.searchSchedule();
            return schduleList;

        }catch (Exception e){
            e.printStackTrace(); // 예외 출력
            return Collections.emptyList(); // 빈 리스트 반환
        }
    };

    @PostMapping(value = {"/save", "/update"})
    public String saveSchedule(HttpServletRequest request,
                               @RequestBody ScheduleDto scheduleDto /* axios > post를 받기위해서(@RequestBody) */
    ){

        // Start Saving Schedule
        String result = "";

        try{
            // Start Logging
            String requestURI = request.getRequestURI();
            if (requestURI.endsWith("/save")) {
                log.info(">>>>>>>>>> Save Schedule >>>>>>>>>>");
                scheduleDto.setUserId("dkstkdwo93@naver.com");
                scheduleService.saveSchedule(scheduleDto);

            } else if (requestURI.endsWith("/update")) {
                log.info(">>>>>>>>>> Update Schedule >>>>>>>>>>");
            }

            result = "1";
        }catch (Exception e){
            e.getStackTrace();
            result = "0";
        }

        return result;
    }

    @GetMapping("/delete")
    public String getCurrencyRate(){

        log.info(">>>>>>>>>> Delete Schedule >>>>>>>>>>");



        return null;
    }
}

