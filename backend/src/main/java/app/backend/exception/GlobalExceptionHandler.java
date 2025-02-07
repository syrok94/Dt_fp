package app.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import app.backend.dto.ResponseDTO;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ResponseDTO> handleSignatureException(SignatureException ex) {
        return buildErrorResponse("Invalid or tampered JWT token!", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ResponseDTO> handleExpiredJwtException(ExpiredJwtException ex) {
        return buildErrorResponse("JWT token has expired!", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ResponseDTO> handleMalformedJwtException(MalformedJwtException ex) {
        return buildErrorResponse("Malformed JWT token!", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseDTO> handleBadCredentialsException(BadCredentialsException ex) {
        return buildErrorResponse("Invalid username or password!", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDTO> handleGenericException(Exception ex) {
        return buildErrorResponse("An unexpected error occurred!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ResponseDTO> buildErrorResponse(String message, HttpStatus status) {
        ResponseDTO response = new ResponseDTO();
        response.setMessage(message);
        return ResponseEntity.status(status).body(response);
    }
}
