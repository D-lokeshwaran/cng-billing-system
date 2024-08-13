package com.cng_billing_system.core_api.helpers;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class SimpleEmailHelper {

    public static Properties properties = new Properties();
    public static Log log = LogFactory.getLog(SimpleEmailHelper.class);

    static {
        try {
            InputStream inputStream =
                SimpleEmailHelper.class.getClassLoader().getResourceAsStream("application.properties");
            properties.load(inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void sendEmail(String toEmail, String content, String subject) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(toEmail);
        msg.setText(content);
        msg.setSubject(subject);
        try{
            JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
            mailSender.setHost(properties.getProperty("smtpHost"));
            mailSender.setPort(Integer.parseInt(properties.getProperty("smtpPort")));
            mailSender.setUsername(properties.getProperty("smtpUsername"));
            mailSender.setPassword(properties.getProperty("smtpPassword"));
            mailSender.getJavaMailProperties().setProperty("mail.smtp.auth", "true");
            mailSender.getJavaMailProperties().setProperty("mail.smtp.starttls.enable", "true");

            mailSender.send(msg);
            log.info("{ MAIL LOG } == To: " + toEmail + ", subject: " + subject);
        } catch(MailException ex) {
            log.error(ex.getMessage());
        }
    }

}
