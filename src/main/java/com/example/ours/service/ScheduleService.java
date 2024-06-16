package com.example.ours.service;

import com.example.ours.repository.ScheduleRepository;
import com.example.ours.dto.schedule.ScheduleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    // search schedule
    public List<ScheduleDto> searchSchedule() {
        return scheduleRepository.findAll();
    }

    // save schedule
    public ScheduleDto saveSchedule(ScheduleDto scheduleDto) {
        return scheduleRepository.save(scheduleDto);
    }
}