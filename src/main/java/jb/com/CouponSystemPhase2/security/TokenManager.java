package jb.com.CouponSystemPhase2.security;

import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
import jb.com.CouponSystemPhase2.exceptions.ErrorMsg;
import jb.com.CouponSystemPhase2.exceptions.SecurityErrorMsg;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TokenManager {
    private Map<UUID, Information> map = new HashMap<>();


    public UUID saveToken(String email,int id, ClientType type) throws CouponSystemException, CouponSecurityException {

        switch (type) {
            case ADMINISTRATOR:
                Information informationAdmin = new Information();
                informationAdmin.setEmail(email);
                informationAdmin.setType(ClientType.ADMINISTRATOR);
                informationAdmin.setTime(LocalDateTime.now());
                informationAdmin.setUserId(1);

                UUID token = UUID.randomUUID();
                map.put(token, informationAdmin);
                return token;
            case COMPANY:
                removePreviousInstances(id);
                Information informationCompany = new Information();
                informationCompany.setEmail(email);
                informationCompany.setType(ClientType.COMPANY);
                informationCompany.setTime(LocalDateTime.now());
                informationCompany.setUserId(id);

                UUID token2 = UUID.randomUUID();
                map.put(token2, informationCompany);

                return token2;
            case CUSTOMER:
                removePreviousInstances(id);
                Information informationCustomer = new Information();
                informationCustomer.setEmail(email);
                informationCustomer.setType(ClientType.CUSTOMER);
                informationCustomer.setTime(LocalDateTime.now());
                informationCustomer.setUserId(id);

                UUID token3 = UUID.randomUUID();
                map.put(token3, informationCustomer);
                return token3;
            default:
                throw new CouponSystemException(ErrorMsg.LOGIN_NOT_FOUND);

        }
    }

    public int getUserId(UUID token) throws CouponSecurityException {
        Information information = map.get(token);
        if (information == null) {
            throw new CouponSecurityException(SecurityErrorMsg.INVALID_TOKEN);

        }
        return information.getUserId();
    }

    @Scheduled(fixedRate = 1800000)
    public void removeExpiredToken() {
        map.entrySet().removeIf(ins -> ins.getValue().getTime().isAfter(LocalDateTime.now().minusMinutes(30)));

    }

    public void removePreviousInstances(int userId) {
        map.entrySet().removeIf(ins -> ins.getValue().getUserId() == userId);
    }

}



