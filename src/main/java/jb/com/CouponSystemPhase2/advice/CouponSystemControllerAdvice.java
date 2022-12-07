package jb.com.CouponSystemPhase2.advice;

import jb.com.CouponSystemPhase2.exceptions.CouponSystemException;
import jb.com.CouponSystemPhase2.exceptions.CouponSecurityException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class CouponSystemControllerAdvice {

    @ExceptionHandler(value = {CouponSecurityException.class})
    public ResponseEntity<?> handleSecException(CouponSecurityException e){
       return new ResponseEntity<>(e.getSecurityErrorMsg().getMsg(),e.getSecurityErrorMsg().getStatus());
    }

    @ExceptionHandler(value = {CouponSystemException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrDTO handleException(Exception e){
        return new ErrDTO(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
