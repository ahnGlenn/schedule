package com.example.ours.controller.schedule;

import com.example.ours.dto.schedule.ScheduleDto;

import com.example.ours.service.ScheduleService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {
    private static final Logger log = LoggerFactory.getLogger(ScheduleController.class);

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping(value = {"/save", "/update"})
    public String saveSchedule(HttpServletRequest request, @RequestParam String selectedDate ){

        // Start Logging
        String requestURI = request.getRequestURI();
        if (requestURI.endsWith("/save")) {
            log.info(">>>>>>>>>> Save Schedule >>>>>>>>>>");
        } else if (requestURI.endsWith("/update")) {
            log.info(">>>>>>>>>> Update Schedule >>>>>>>>>>");
        }

        // Start Saving Schedule
        String result = "";
        try{
            System.out.println("날짜 : " + selectedDate);
            // scheduleService.saveSchedule();
        }catch (Exception e){
            e.getStackTrace();
        }

        return result;
    }

    @GetMapping("/delete")
    public String getCurrencyRate(){

        log.info(">>>>>>>>>> Delete Schedule >>>>>>>>>>");



        return null;
    }
}

