package com.cng_billing_system.core_api.bill;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BillOverdueReminderService  {

    private final BillRepository billRepository;

    /* Run daily at 9 AM
    *  to send email one week before overdue and
    *  send email one week after overdue
    * */
    @Async
    @Scheduled(cron = "0 0 9 * * *")
    public void sendDueDateReminders() {
        List<Bill> billList = billRepository.findAll();
        for (Bill bill : billList) {
            LocalDate billDueDate = LocalDate.parse(bill.getPaymentDueDate().toString(),
                    DateTimeFormatter.ISO_LOCAL_DATE);
            LocalDate oneWeekBeforeDueDate = billDueDate.minusWeeks(1);
            LocalDate oneWeekAfterDueDate = billDueDate.plusWeeks(1);

            if (oneWeekBeforeDueDate.equals(LocalDate.now())) {
                BillEmailService.sendOverdueEmailBeforeAWeek(bill);
            } else if (oneWeekAfterDueDate.equals(LocalDate.now())) {
                BillEmailService.sendMissedDueEmailAfterAWeek(bill);
            }
        }
    }

}