package com.ustglobal.assessmentboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;

@Configuration
public class HibernateConfig {
	
	@Bean
	public LocalEntityManagerFactoryBean getBean() {
		LocalEntityManagerFactoryBean bean = new LocalEntityManagerFactoryBean();
		bean.setPersistenceUnitName("assessment-unit");
		return bean;
	}
}
