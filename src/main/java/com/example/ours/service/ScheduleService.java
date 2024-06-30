package com.example.ours.service;

import com.example.ours.repository.ScheduleRepository;
import com.example.ours.dto.schedule.ScheduleDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;


    // search schedule
    public List<ScheduleDto> searchSchedule() {
        return scheduleRepository.findScheduleDtoBy();
    }


    // save schedule
    public ScheduleDto saveSchedule(ScheduleDto scheduleDto) {
        return scheduleRepository.save(scheduleDto);
    }


    // delete schedule
    @Transactional
    public void deleteSchedule(ScheduleDto scheduleDto) throws Exception{
        Long id = scheduleDto.getId();
        String userId = scheduleDto.getUserId();
        String delYn = "Y";
        if(scheduleRepository.existsById(id)){
            scheduleRepository.updateDelYn(id ,userId, delYn);
        }else{
            throw new Exception("Schedule not found");
        }
    }


}