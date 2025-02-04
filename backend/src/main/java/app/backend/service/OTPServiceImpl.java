package app.backend.service;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
@Service
public class OTPServiceImpl implements OTPService {
	
	@Autowired
	RedisTemplate<String, String> redis;

	@Override
	public String generateOTP(String email) {
		// TODO Auto-generated method stub
		int expirationTime = 60*1000;
		SecureRandom secureRandom = new SecureRandom();
		String otp = String.valueOf(secureRandom.nextInt(1000,9999));
		redis.opsForValue().set(email, otp,expirationTime,TimeUnit.MILLISECONDS);
		return otp;
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

}
