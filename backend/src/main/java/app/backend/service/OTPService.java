package app.backend.service;

public interface OTPService {
	public String generateOTP(String email);
	public boolean validateOTP(String email, String otp);
	public boolean updatePassword(String email, String password);
}
