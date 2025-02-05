package app.backend.service;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.backend.entity.UserInfo;
import app.backend.repository.UserInfoRepository;
@Service
public class OTPServiceImpl implements OTPService {
	
	@Autowired
	RedisTemplate<String, String> redis;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	UserInfoRepository userRepo;
	
	@Autowired
	PasswordEncoder encoder;

	@Override
	public String generateOTP(String email) {
		// TODO Auto-generated method stub
		int expirationTime = 5*60*1000;
		SecureRandom secureRandom = new SecureRandom();
		String otp = String.valueOf(secureRandom.nextInt(1000,9999));
		redis.opsForValue().set(email, otp,expirationTime,TimeUnit.MILLISECONDS);
		emailService.sendOTPEmail(email, otp);
		return "OTP send successfully";
	}

	@Override
	public boolean validateOTP(String email, String otp) {
		// TODO Auto-generated method stub
		String validOtp = redis.opsForValue().get(email);
		if(validOtp!=null && validOtp.equals(otp)) {
			redis.delete(email);
			return true;
		}
		return false;
	}
	
	@Override
	public String updatePassword(String email, String password) {
		// TODO Auto-generated method stub
		UserInfo user = userRepo.findByEmail(email).get();
		user.setPassword(encoder.encode(password));
		userRepo.save(user);
		return "Password updated successfully";
	}

}
