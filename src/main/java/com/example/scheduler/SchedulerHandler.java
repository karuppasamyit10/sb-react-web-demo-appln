package com.example.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Component
public class SchedulerHandler {

	private static final Logger logger = LoggerFactory.getLogger(SchedulerHandler.class);
	
	@Scheduled(cron = "0 0 1 * * ?")
//	@Scheduled(cron = "5 * * * * ?")
	public void updateManipalCron(){
		logger.info("CRON ==> Entering into updating daily");
		try{
//			updateDailyDetailsFromManipalServers();
		}catch(Exception e){
			logger.info("CRON ==> Exception in collecting External server");
			e.printStackTrace();
		}
	}
}
