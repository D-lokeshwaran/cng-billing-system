package com.cng_billing_system.core_api.bill;

import com.cng_billing_system.core_api.helpers.SimpleEmailHelper;
import org.springframework.scheduling.annotation.Async;

import java.text.SimpleDateFormat;
import java.util.Date;

public class BillEmailService {

    public static final  SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

    @Async
    public static void sendBillCreatedEmail(Bill bill) {
        String billingDate = dateFormat.format(bill.getBillingDate());
        String dueDate = dateFormat.format(bill.getPaymentDueDate());
        String subject = "Statement of bill #" + bill.getId() + " for CNG gas due " + dueDate;

        String billCreatedContent =
                "Hi " + bill.getCustomer().getFullName() + "\n\n" +
                "Greetings from CNG Gas billing operator\n\n" +
                    "\tYour CNG gas bill is created on " + billingDate +
                ", the total amount is " + bill.getBillAmount() + " for units " + bill.getUnitsConsumed() +
                " at a rate of " + bill.getRatePerUnit() + " per unit consumed.\n" +
                "Last payment date by " + dueDate + "\n\n" +
                "Please don’t hesitate to reach out in case of any questions.\n\n" +
                "Regards,\n\n" +
                "Lokeshwaran\n" +
                "8660095614\n" +
                "deftlokeshwaran0612@gmail.com";

        SimpleEmailHelper.sendEmail(bill.getCustomer().getEmailAddress(), billCreatedContent, subject);

    }

    @Async
    public static void sendMarkAsPaidEmail(Bill bill) {
        String billingDate = dateFormat.format(bill.getBillingDate());
        String dueDate = dateFormat.format(bill.getPaymentDueDate());
        String today = dateFormat.format(new Date());
        String subject = "Your CNG gas Bill #" + bill.getId() + " is Paid";

        String billCreatedContent =
                "Hi " + bill.getCustomer().getFullName() + "\n\n" +
                "Greetings from CNG Gas billing operator\n\n" +
                    "\tYour CNG gas bill for the period " + billingDate + " to " + dueDate + " has\n" +
                "been successfully paid on " + today + " of payment Amount " + bill.getBillAmount() + "\n\n" +
                "Your account is now up-to-date. Thank you for your timely payment.\n\n" +
                "Regards,\n\n" +
                "Lokeshwaran\n" +
                "8660095614\n" +
                "deftlokeshwaran0612@gmail.com";

        SimpleEmailHelper.sendEmail(bill.getCustomer().getEmailAddress(), billCreatedContent, subject);
    }

    public static void sendOverdueEmailBeforeAWeek(Bill bill) {
        if (bill.getCustomer() == null) return;
        String billingDate = dateFormat.format(bill.getBillingDate());
        String dueDate = dateFormat.format(bill.getPaymentDueDate());
        String subject = "Payment reminder for CNG gas Bill #" + bill.getId();

        String billCreatedContent =
                "Hi " + bill.getCustomer().getFullName() + "\n\n" +
                "Greetings from CNG Gas billing operator\n\n" +
                "This is to remind you that the bill "+ bill.getId() + " dated " + dueDate + " that I sent you on " + billingDate +
                " is due for payment one week from now.\n\n" +
                "Although I know you are busy, I would greatly appreciate it if you could review the bill and \n" +
                "payment details for the work done and send a confirmation email. If you have any questions, please feel free to reach out.\n\n" +
                "Regards,\n\n" +
                "Lokeshwaran\n" +
                "8660095614\n" +
                "deftlokeshwaran0612@gmail.com";

        SimpleEmailHelper.sendEmail(bill.getCustomer().getEmailAddress(), billCreatedContent, subject);
    }


    public static void sendMissedDueEmailAfterAWeek(Bill bill) {
        if (bill.getCustomer() == null) return;
        String dueDate = dateFormat.format(bill.getPaymentDueDate());
        String subject = "Overdue CNG gas Bill #" + bill.getId() + " due " + dueDate;

        String billCreatedContent =
                "Hi " + bill.getCustomer().getFullName() + "\n\n" +
                "Greetings from CNG Gas billing operator\n\n" +
                "As per our records, we are yet to receive payment for bill "+ bill.getId() + " for CNG gas that due on " +
                dueDate + " is now one week overdue.\n\n" +
                "If you have already made the payment, please ignore this email. If you have not made the payment yet, \n" +
                "Please let us know by when we can expect the payment. Feel free to reach out in case of any questions or concerns.\n\n" +
                "Regards,\n\n" +
                "Lokeshwaran\n" +
                "8660095614\n" +
                "deftlokeshwaran0612@gmail.com";

        SimpleEmailHelper.sendEmail(bill.getCustomer().getEmailAddress(), billCreatedContent, subject);
    }



}
