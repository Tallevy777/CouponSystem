package jb.com.CouponSystemPhase2.clr;

import jb.com.CouponSystemPhase2.beans.Category;
import jb.com.CouponSystemPhase2.beans.Company;
import jb.com.CouponSystemPhase2.beans.Coupon;
import jb.com.CouponSystemPhase2.beans.Customer;
import jb.com.CouponSystemPhase2.repos.CompanyRepository;
import jb.com.CouponSystemPhase2.repos.CouponRepository;
import jb.com.CouponSystemPhase2.repos.CustomerRepository;
import jb.com.CouponSystemPhase2.services.AdminServiceImpl;
import jb.com.CouponSystemPhase2.services.CompanyServiceImpl;
import jb.com.CouponSystemPhase2.services.CustomerServiceImpl;
import jb.com.CouponSystemPhase2.utils.Art;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Arrays;
@Component
@Order(1)
@RequiredArgsConstructor // final + Req args to Avoid circular dependency
public class Init implements CommandLineRunner {

    private final CouponRepository couponRepository;
    private final CustomerRepository customerRepository;
    private final CompanyRepository companyRepository;
    private final AdminServiceImpl adminService;
    private final CompanyServiceImpl companyService;
    private final CustomerServiceImpl customerService;

//    private final LoginManager loginManager;


    @Override
    public void run(String... args) throws Exception {
        System.out.println(Art.COMPANIES);
        Company company1 = Company.builder()
                .name("company1")
                .email("company1@gmail.com")
                .password("1234")
                .build();

        Company company2 = Company.builder()
                .name("company2")
                .email("company2@gmail.com")
                .password("1234")
                .build();

        Company company3 = Company.builder()
                .name("company3")
                .email("company3@gmail.com")
                .password("1234")
                .build();

        Company company4 = Company.builder()
                .name("company4")
                .email("company54@gmail.com")
                .password("1234")
                .build();

        Company company5 = Company.builder()
                .name("company5")
                .email("company5@gmail.com")
                .password("1234")
                .build();

        this.companyRepository.saveAll(Arrays.asList(company1, company2, company3, company4, company5));
        this.companyRepository.findAll().forEach(System.out::println);

        System.out.println(Art.CUSTOMERS);



        Customer customer1 = Customer.builder()
                .firstName("customer1")
                .lastName("levy")
                .email("customer1@gmail.com")
                .password("1234")
                .build();

        Customer customer2 = Customer.builder()
                .firstName("customer2")
                .lastName("levy")
                .email("customer2@gmail.com")
                .password("1234")
                .build();

        Customer customer3 = Customer.builder()
                .firstName("customer3")
                .lastName("levy")
                .email("customer3@gmail.com")
                .password("1234")
                .build();
        this.customerRepository.saveAll(Arrays.asList(customer1, customer2, customer3));
        this.customerRepository.findAll().forEach(System.out::println);

        System.out.println(Art.COUPONS);

        Coupon coupon1 = Coupon.builder()
                .title("coupon1")
                .category(Category.PC)
                .description("coupon1 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(4)))
                .amount(50)
                .price(49.99)
                .image("https://cataas.com/cat")
                .company(company1)
                .build();

        Coupon coupon2 = Coupon.builder()
                .title("coupon2")
                .category(Category.DRINKS)
                .description("coupon2 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(4)))
                .amount(50)
                .price(70.99)
                .image("https://cataas.com/cat")
                .company(company2)
                .build();

        Coupon coupon3 = Coupon.builder()
                .title("coupon3")
                .category(Category.SPORTS)
                .description("coupon3 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(4)))
                .amount(50)
                .price(4.99)
                .image("https://cataas.com/cat")
                .company(company3)
                .build();

        this.couponRepository.saveAll(Arrays.asList(coupon1, coupon2, coupon3));
        this.couponRepository.findAll().forEach(System.out::println);

        Company company6 = Company.builder()
                .name("company6")
                .email("company6@gmail.com")
                .password("1234")
                .build();

        Company company7 = Company.builder()
                .email("company7@gmail.com")
                .password("1234")
                .build();

        Customer customer4 = Customer.builder()
                .firstName("customer4")
                .lastName("levy")
                .email("customer4@gmail.com")
                .password("1234")
                .build();

        Customer customer5 = Customer.builder()
                .firstName("customer5")
                .lastName("levy")
                .email("customer5@gmail.com")
                .password("1234")
                .build();

        Coupon coupon4 = Coupon.builder()
                .title("coupon4")
                .category(Category.PC)
                .description("coupon4 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(4)))
                .amount(5)
                .price(12.12)
                .image("https://cataas.com/cat")
                .company(company2)
                .build();

        Coupon coupon5 = Coupon.builder()
                .title("coupon5")
                .category(Category.PC)
                .description("coupon5 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(4)))
                .amount(123)
                .price(18.12)
                .image("https://cataas.com/cat")
                .company(company2)
                .build();

        Coupon coupon6 = Coupon.builder()
                .title("coupon6")
                .category(Category.PC)
                .description("coupon6 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(4)))
                .amount(122222)
                .price(1.5)
                .image("https://cataas.com/cat")
                .company(company6)
                .build();

        Coupon coupon7 = Coupon.builder()
                .title("coupon7")
                .category(Category.PC)
                .description("coupon7 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(8)))
                .amount(322)
                .price(15.5)
                .image("https://cataas.com/cat")
                .company(company6)
                .build();

        Coupon coupon8 = Coupon.builder()
                .title("coupon8")
                .category(Category.DRINKS)
                .description("coupon8 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(9)))
                .amount(138)
                .price(77)
                .image("https://cataas.com/cat")
                .company(company6)
                .build();

        Coupon coupon9 = Coupon.builder()
                .title("coupon9")
                .category(Category.FOOD)
                .description("coupon9 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(12)))
                .amount(75)
                .price(232)
                .image("https://cataas.com/cat")
                .company(company6)
                .build();

        Coupon coupon10 = Coupon.builder()
                .title("coupon10")
                .category(Category.VACATION)
                .description("coupon10 description")
                .startDate(Date.valueOf(LocalDate.now()))
                .endDate(Date.valueOf(LocalDate.now().plusMonths(4)))
                .amount(500)
                .price(20)
                .image("https://cataas.com/cat")
                .company(company6)
                .build();


//        System.out.println(Art.ADMIN_SERVICE);
//        System.out.println("~~~~~~~~~~Logging In~~~~~~~~~~");
//        // TODO - LOGIN
////        AdminServiceImpl adminService = (AdminServiceImpl) loginManager.login("admin@admin", "admin", ClientType.ADMINISTRATOR);
//        System.out.println("~~~~~~~~~~Deleting id 1~~~~~~~~~~");
//        adminService.deleteCompany(1);
//        System.out.println(adminService.getAllCompanies());
//        System.out.println("~~~~~~~~~~Get id 2~~~~~~~~~~");
//        System.out.println(adminService.getCompany(2));
//        System.out.println("~~~~~~~~~~Adding company4~~~~~~~~~~");
//        adminService.addCompany(company6);
//        System.out.println(adminService.getAllCompanies());
//        System.out.println("~~~~~~~~~~Updating company2 to company7~~~~~~~~~~");
//        adminService.updateCompany(2, company7);
//        System.out.println(adminService.getAllCompanies());
//        System.out.println("~~~~~~~~~~Adding customer4~~~~~~~~~~");
//        adminService.addCustomer(customer4);
//        System.out.println(adminService.getAllCustomer());
//        System.out.println("~~~~~~~~~~Updating 2 to customer5~~~~~~~~~~");
//        adminService.updateCustomer(2, customer5);
//        System.out.println(adminService.getAllCustomer());
//        System.out.println("~~~~~~~~~~Deleting 1~~~~~~~~~~");
//        adminService.deleteCustomer(1);
//        System.out.println(adminService.getAllCustomer());
//        System.out.println("~~~~~~~~~~Getting id 2~~~~~~~~~~");
//        System.out.println(adminService.getCustomer(2));
//
//
//        System.out.println(Art.COMPANY_SERVICE);
//        System.out.println("~~~~~~~~~~Logging In~~~~~~~~~~");
//        // TODO - LOGIN
////        CompanyServiceImpl companyService = (CompanyServiceImpl) LoginManager.login("company6@gmail.com", "1234", ClientType.COMPANY);
//        System.out.println("~~~~~~~~~~All Current Coupons company 6~~~~~~~~~~");
//        System.out.println(companyService.getAllCoupons());
//        System.out.println("~~~~~~~~~~Adding Coupon 5 to 9~~~~~~~~~~");
//        companyService.addCoupon(coupon5);
//        companyService.addCoupon(coupon6);
//        companyService.addCoupon(coupon7);
//        companyService.addCoupon(coupon8);
//        companyService.addCoupon(coupon9);
//        companyService.addCoupon(coupon10);
//        System.out.println(companyService.getAllCoupons());
//        System.out.println("~~~~~~~~~Updating coupon9 to coupon4~~~~~~~~~~");
//        companyService.updateCoupon(9, coupon4);
//        System.out.println(companyService.getAllCoupons());
//        System.out.println("~~~~~~~~~~Delete Coupon id 9~~~~~~~~~~");
//        companyService.deleteCoupon(9);
//        System.out.println(companyService.getAllCoupons());
//        System.out.println("~~~~~~~~~~Get all coupons Category PC~~~~~~~~~~");
//        System.out.println(companyService.getAllCouponsByCategory( Category.PC));
//        System.out.println("~~~~~~~~~~Get All Coupons By Max Price~~~~~~~~~~");
//        System.out.println(companyService.getAllCouponsByMaxPrice(10));
//        System.out.println("~~~~~~~~~~Get Company Info~~~~~~~~~~");
//        System.out.println(companyService.getCompanyInfo());
//
//
//        System.out.println(Art.CUSTOMER_SERVICE);
//        System.out.println("~~~~~~~~~~Logging In~~~~~~~~~~");
//        // TODO - LOGIN
////        CustomerServiceImpl customerService = (CustomerServiceImpl) loginManager.login("customer3@gmail.com", "1234", ClientType.CUSTOMER);
//        System.out.println("~~~~~~~~~~All coupons currently owned by the customer~~~~~~~~~~");
//        System.out.println(customerService.getAllCoupons());
//        System.out.println("~~~~~~~~~~Purchase coupons 7,8,9,10 ~~~~~~~~~~");
//        customerService.purchaseCoupon(coupon7);
//        customerService.purchaseCoupon(coupon8);
//        customerService.purchaseCoupon(coupon9);
//        System.out.println("~~~~~~~~~~Did Company 6 coupon dropped in amount value for coupon 7?~~~~~~~~~~");
//        System.out.println(companyService.getAllCoupons());
//        System.out.println("~~~~~~~~~~Did customer 3 get coupons?~~~~~~~~~~");
//        System.out.println(customerService.getAllCoupons());
//        System.out.println("~~~~~~~~~~Get all coupons by category~~~~~~~~~~");
//        System.out.println(customerService.getAllCouponsByCategory(Category.FOOD));
//        System.out.println("~~~~~~~~~~Get all coupons by max price~~~~~~~~~~");
//        System.out.println( customerService.getAllCouponsByMaxPrice(70.00));
//        System.out.println("~~~~~~~~~~give me my customer info!~~~~~~~~~~");
//        System.out.println(customerService.getCustomerInfo());
//
//
//
    }
}

