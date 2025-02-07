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
import app.backend.enums.RoleEnum;
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

        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public boolean addUser(UserInfo userInfo) {
    	if(userInfo.getEmail()!=null && userInfo.getName()!=null && userInfo.getPassword()!=null && userInfo.getRole()!=null) {
    		userInfo.setPassword(encoder.encode(userInfo.getPassword()));
    		repository.save(userInfo);
    		return true;
    	}
        return false;
    }

	@Override
	public boolean removeUser(UUID userId) {
		Optional<UserInfo> optUser= repository.findById(userId);
    	if(optUser.isPresent()) {
    		UserInfo user = optUser.get();
    		repository.delete(user);
    		return true;
    	}		
		return false;
	}

	@Override
	public UserDTO updateUser(UUID userId, UserDTO dtoUser) {
		Optional<UserInfo> optUser = repository.findById(userId);
		if(optUser.isPresent()&& dtoUser.getEmail()!=null && dtoUser.getName()!=null && dtoUser.getRole()!=null) {
			UserInfo user = optUser.get();
			BeanUtils.copyProperties(dtoUser, user);
			repository.save(user);
		}
		return dtoUser;
	}

	@Override
	public List<UserDTO> getAllDevelopers() {
		List<UserInfo> userList = repository.findAllByRole(RoleEnum.DEVELOPER);
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
		Optional<UserInfo> optUser= repository.findByEmail(email);
    	if(optUser.isPresent()) {
    		UserInfo user = optUser.get();
        	UserDTO dtoUser = new UserDTO();
    		BeanUtils.copyProperties(user, dtoUser);
    		return dtoUser;
    	}
		return null;
	}
	
	public UserDTO getUserById(UUID userId) {
		Optional<UserInfo> optUser = repository.findById(userId);
		if(optUser.isPresent()) {
			UserInfo user = optUser.get();
			UserDTO dtoUser = new UserDTO();
			BeanUtils.copyProperties(user, dtoUser);
			return dtoUser;
		}
		return null;
	}

}