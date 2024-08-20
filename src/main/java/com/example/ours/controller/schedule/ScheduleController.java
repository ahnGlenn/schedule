package com.example.ours.controller.schedule;

import com.example.ours.dto.schedule.ScheduleDto;
import com.example.ours.service.ScheduleService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    /**********************************
     루틴 스프링 배치, 알람 >> 목표 / 일정
     **********************************/



    /**********************************
     스케줄 페이지 시작, 일정 클릭 시 리스트 호출
     **********************************/
    @GetMapping(value = {"/list", "/detail"})
    public List<ScheduleDto> searchList(){

        log.info(">>>>>>>>>> Search Schedule list >>>>>>>>>>");

        try {
            List<ScheduleDto> schduleList = scheduleService.searchSchedule();

            return schduleList;

        }catch (Exception e){
            e.printStackTrace();
            return Collections.emptyList(); // 빈 리스트 반환
        }
    };



    /**********************************
     캘린더 일정 등록 및 수정
     **********************************/
    @PostMapping(value = {"/save", "/update"})
    public ResponseEntity<String> saveSchedule(HttpServletRequest request,
                               @RequestBody ScheduleDto scheduleDto
                                /* axios > post를 받기위해서(@RequestBody) */
    ){
        try {
            String requestURI = request.getRequestURI();

            if (requestURI.endsWith("/save")) {
                log.info(">>>>>>>>>> Save Schedule >>>>>>>>>>");
                scheduleDto.setUserId("dkstkdwo93@naver.com");
                scheduleService.saveSchedule(scheduleDto);

            } else if (requestURI.endsWith("/update")) {
                log.info(">>>>>>>>>> Update Schedule >>>>>>>>>>");
            }

            return ResponseEntity.ok("Schedule save/update successfully");

        } catch (Exception e) {
            log.error("Error deleting schedule", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save/update schedule");
        }

    }



    /**********************************
     캘린더 일정 삭제
     **********************************/
    @PostMapping("/delete")
    public ResponseEntity<String> deleteSchedule(@RequestBody ScheduleDto scheduleDto){

        log.info(">>>>>>>>>> Delete Schedule >>>>>>>>>>");

        try {
            scheduleService.deleteSchedule(scheduleDto);
            return ResponseEntity.ok("Schedule deleted successfully");
        } catch (Exception e) {
            log.error("Error deleting schedule", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete schedule");
        }
    }


}

