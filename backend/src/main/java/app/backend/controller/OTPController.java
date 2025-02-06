package app.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.backend.dto.ResponseDTO;
import app.backend.entity.AuthRequest;
import app.backend.entity.UserInfo;
import app.backend.repository.UserInfoRepository;
import app.backend.service.OTPService;

@RestController
@RequestMapping("/forgotPassword")
public class OTPController {

	@Autowired
	UserInfoRepository userRepo;
	
	@Autowired
	OTPService otpService;
	
	@PostMapping("/generateOtp")
	public ResponseEntity<ResponseDTO> getOTP(@RequestBody AuthRequest request) {
		String email = request.getEmail();
		Optional<UserInfo> optUser = userRepo.findByEmail(email);
		ResponseDTO response = new ResponseDTO();
		response.setMessage("Email not found");
		if(optUser.isPresent()) {
			response.setMessage(otpService.generateOTP(email));
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}
	
	@PostMapping("/validateOtp")
	public ResponseEntity<ResponseDTO> validateOTP(@RequestBody AuthRequest request) {
		String email = request.getEmail();
		String otp = request.getPassword();
		ResponseDTO response = new ResponseDTO();
		response.setMessage("Invalid");
		if(otpService.validateOTP(email, otp)) {
			response.setMessage("Valid");
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}
	
    @PutMapping("/updatePassword")
    public ResponseEntity<ResponseDTO> updatePassword(@RequestBody AuthRequest request) {
    	String email = request.getEmail();
    	String password = request.getPassword();
    	ResponseDTO response = new ResponseDTO();
    	response.setMessage("Password updation failure");
    	if(otpService.updatePassword(email, password)) {
    		response.setMessage("Password updated successfully");
    		return ResponseEntity.status(HttpStatus.OK).body(response);
    	}
    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    } 

}
