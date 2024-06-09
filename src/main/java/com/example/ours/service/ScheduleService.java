package com.example.ours.service;

import com.example.ours.repository.ScheduleRepository;
import com.example.ours.dto.schedule.ScheduleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public ScheduleDto saveSchedule(ScheduleDto scheduleDto) {
        return scheduleRepository.save(scheduleDto);
    }
}