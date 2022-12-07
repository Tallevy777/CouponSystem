//package jb.com.CouponSystemPhase2.security;
//
//import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
//import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
//import jb.com.CouponSystemPhase2.exceptions.ErrorMsg;
//import jb.com.CouponSystemPhase2.services.*;
//import jb.com.CouponSystemPhase2.utils.Art;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.annotation.Lazy;
//import org.springframework.stereotype.Service;
//@Service
//@Lazy
//public class LoginManager {
//    @Autowired
//    private ApplicationContext ctx;
//    @Autowired
//    protected CompanyServiceImpl companyService;
//    @Autowired
//    protected CustomerServiceImpl customerService;
//    @Autowired
//    protected AdminServiceImpl adminService;
//
//    public ClientService login(String email, String password, ClientType type) throws CouponSystemException, CouponSecurityException {
//        ClientService clientService = null;
//        switch (type) {
//            case ADMINISTRATOR:
//                clientService = adminService;
//                break;
//            case COMPANY:
//                companyService = (CompanyServiceImpl) ctx.getBean(CompanyService.class);
//                clientService = companyService;
//                break;
//            case CUSTOMER:
//                customerService = (CustomerServiceImpl) ctx.getBean(CustomerService.class);
//                clientService = customerService;
//                break;
//            default:
//                throw new CouponSystemException(ErrorMsg.LOGIN_NOT_FOUND);
//
//        }
//
//
//        boolean isLoginOK = clientService.login(email,password);
//        if (isLoginOK) {
//            System.out.println(Art.GRANTED);
//            return clientService;
//        }throw new CouponSystemException(ErrorMsg.LOGIN_NOT_FOUND);
//}
//}
