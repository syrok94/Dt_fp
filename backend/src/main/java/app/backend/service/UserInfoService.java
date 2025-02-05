package app.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.backend.dto.UserDTO;
import app.backend.entity.UserInfo;
import app.backend.repository.UserInfoRepository;

@Service
public class UserInfoService implements UserDetailsService, UserServices {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userDetail = repository.findByEmail(username); // Assuming 'email' is used as username

        // Converting UserInfo to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public String addUser(UserInfo userInfo) {
        // Encode password before saving the user
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User Added Successfully";
    }

	@Override
	public String removeUser(UUID userId) {
		Optional<UserInfo> optUser= repository.findById(userId);
    	if(optUser.isPresent()) {
    		UserInfo user = optUser.get();
    		repository.delete(user);
    		return "User deleted successfully";
    	}		
		return "Deletion failed";
	}

	@Override
	public UserDTO updateUser(UUID userId, UserDTO dtoUser) {
		// TODO Auto-generated method stub
		Optional<UserInfo> optUser = repository.findById(userId);
		if(optUser.isPresent()) {
			UserInfo user = optUser.get();
//			String password = user.getPassword();
			BeanUtils.copyProperties(dtoUser, user);
//			user.setPassword(password);
			repository.save(user);
		}
		return dtoUser;
	}

	@Override
	public List<UserDTO> getAllUsers() {
		// TODO Auto-generated method stub
		List<UserInfo> userList = repository.findAll();
    	List<UserDTO> finalList = new ArrayList<UserDTO>();
    	for(UserInfo user: userList) {
    		UserDTO dtoUser = new UserDTO();
    		BeanUtils.copyProperties(user, dtoUser);
    		finalList.add(dtoUser);
    	}
		return finalList;
	}

	@Override
	public UserDTO getUser(String email) {
		// TODO Auto-generated method stub
		Optional<UserInfo> optUser= repository.findByEmail(email);
    	if(optUser.isPresent()) {
    		UserInfo user = optUser.get();
        	UserDTO dtoUser = new UserDTO();
    		BeanUtils.copyProperties(user, dtoUser);
    		return dtoUser;
    	}
		return null;
	}

}